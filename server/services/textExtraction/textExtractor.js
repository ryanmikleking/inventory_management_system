import { extractImageText } from "./ocrExtractor.js";
import { extractPdfText } from "./pdfExtractor.js";
import { imageToPdf } from "./img2pdf.js";

export const extractText = async (file) => {
  let buffer;
  if (file.mimetype !== "application/pdf") {
    const pdfImage = await imageToPdf(file.buffer, file.mimetype);
    buffer = Buffer.from(pdfImage.buffer);
  } else {
    buffer = file.buffer;
  }
  if (!buffer) throw new Error("No file buffer provided");

  const pdfResult = await extractPdfText(buffer);

  const text = pdfResult?.text?.trim() || "";

  if (text.length > 20) {
    return {
      source: "pdf-extractor",
      text,
    };
  }

  const ocrText = await extractImageText(buffer);

  return {
    source: "ocr",
    text: ocrText,
  };
};
