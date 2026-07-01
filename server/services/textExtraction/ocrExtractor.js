import { fromPath } from "pdf2pic";
import Tesseract from "tesseract.js";
import pdfParse from "pdf-parse";
import path from "path";
import fs from "fs/promises";

export const extractImageText = async (pdfBuffer) => {
  const tempDir = path.join(process.cwd(), "temp");
  await fs.mkdir(tempDir, { recursive: true });

  const tempPdfPath = path.join(tempDir, `${Date.now()}.pdf`);

  let worker;

  try {
    // Save uploaded PDF
    await fs.writeFile(tempPdfPath, pdfBuffer);

    // Determine number of pages
    const pdfData = await pdfParse(pdfBuffer);
    const pageCount = pdfData.numpages;

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
      console.log(`Processing page ${page} of ${pageCount}`);

      const image = await converter(page);

      const {
        data: { text },
      } = await worker.recognize(image.path);

      fullText += text + "\n";

      // Optional: remove generated image after OCR
      await fs.unlink(image.path).catch(() => {});
    }
    // console.log("typeof fullText:", typeof fullText);
    // console.log("fullText instanceof String:", fullText instanceof String);

    const trimmed = fullText.trim();

    // console.log("typeof trimmed:", typeof trimmed);
    // console.log(trimmed);

    return trimmed;
  } finally {
    if (worker) {
      await worker.terminate();
    }

    await fs.unlink(tempPdfPath).catch(() => {});
  }
};
