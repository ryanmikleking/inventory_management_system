import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import pdfParse from "pdf-parse";
import { fromPath } from "pdf2pic";
import Tesseract from "tesseract.js";
import sharp from "sharp";

export const extractImageText = async (pdfBuffer) => {
  const jobId = crypto.randomUUID();

  const tempDir = path.join(process.cwd(), "temp", jobId);
  const tempPdfPath = path.join(tempDir, "input.pdf");

  let worker;

  try {
    //console.log(`OCR JOB START: ${jobId}`);

    await fs.mkdir(tempDir, { recursive: true });

    await fs.writeFile(tempPdfPath, pdfBuffer);

    const pdfData = await pdfParse(pdfBuffer);
    const pageCount = pdfData.numpages || 1;

    //console.log(`PDF contains ${pageCount} page(s)`);
    const converter = fromPath(tempPdfPath, {
      density: 300,
      saveFilename: "page",
      savePath: tempDir,
      format: "png",
      width: 2550,
      height: 3300,
    });

    worker = await Tesseract.createWorker("eng");

    await worker.setParameters({
      tessedit_pageseg_mode: Tesseract.PSM.AUTO,
      preserve_interword_spaces: "1",
    });

    let fullText = "";

    for (let page = 1; page <= pageCount; page++) {
      //console.log(`OCR ${jobId}: processing page ${page}/${pageCount}`);

      const image = await converter(page);

      if (!image?.path) {
        throw new Error(`Failed converting page ${page}`);
      }

      //console.log(`Generated image: ${image.path}`);

      const processedPath = path.join(tempDir, `page-${page}-processed.png`);

      await sharp(image.path)
        .grayscale()
        .normalize()
        .sharpen({
          sigma: 1,
        })

        .threshold(180)

        .png()
        .toFile(processedPath);

      //console.log(`Preprocessed image: ${processedPath}`);

      const result = await worker.recognize(processedPath);

      const text = result?.data?.text || "";

      //console.log(`OCR page ${page} characters: ${text.length}`);

      fullText += `\n--- PAGE ${page} ---\n`;
      fullText += text;
      fullText += "\n";

      await fs.unlink(image.path).catch(() => {});
      await fs.unlink(processedPath).catch(() => {});
    }

    return fullText.trim();
  } catch (error) {
    console.error(`OCR JOB FAILED: ${jobId}`, error);

    throw error;
  } finally {
    if (worker) {
      await worker.terminate();
    }

    await fs.unlink(tempPdfPath).catch(() => {});

    await fs
      .rm(tempDir, {
        recursive: true,
        force: true,
      })
      .catch(() => {});

    //console.log(`OCR JOB CLEANED: ${jobId}`);
  }
};
