import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import pdfParse from "pdf-parse";
import { fromPath } from "pdf2pic";
import Tesseract from "tesseract.js";

export const extractImageText = async (pdfBuffer) => {
  // Create a UNIQUE directory for this PDF
  const jobId = crypto.randomUUID();

  const tempDir = path.join(process.cwd(), "temp", jobId);

  await fs.mkdir(tempDir, {
    recursive: true,
  });

  const tempPdfPath = path.join(tempDir, "input.pdf");

  let worker;

  try {
    console.log("OCR JOB:", jobId);

    console.log("PDF BUFFER:", pdfBuffer instanceof Buffer);

    await fs.writeFile(tempPdfPath, pdfBuffer);

    // Determine number of pages
    const pdfData = await pdfParse(pdfBuffer);

    const pageCount = pdfData.numpages || 1;

    console.log(`PDF contains ${pageCount} page(s)`);

    // Configure converter
    const converter = fromPath(tempPdfPath, {
      density: 200,
      saveFilename: "page",
      savePath: tempDir,
      format: "png",
      width: 1200,
      height: 1600,
    });

    worker = await Tesseract.createWorker("eng");

    let fullText = "";

    for (let page = 1; page <= pageCount; page++) {
      console.log(`OCR ${jobId}: processing page ${page}`);

      const image = await converter(page);

      console.log("Generated image:", image.path);

      if (!image.path) {
        throw new Error(`Failed converting page ${page}`);
      }

      const {
        data: { text },
      } = await worker.recognize(image.path);

      fullText += text + "\n";

      // Remove this page's image
      await fs.unlink(image.path).catch(() => {});
    }

    return fullText.trim();
  } finally {
    if (worker) {
      await worker.terminate();
    }

    // Remove the PDF
    await fs.unlink(tempPdfPath).catch(() => {});

    // Remove the unique directory
    await fs
      .rm(tempDir, {
        recursive: true,
        force: true,
      })
      .catch(() => {});

    console.log("OCR JOB CLEANED:", jobId);
  }
};
