import { extractImageText } from "./ocrExtractor.js";
import { extractPdfText } from "./pdfExtractor.js";
export const extractText = async (buffer) => {
    if (!buffer) throw new Error("No file buffer provided");

    // STEP 1: use your existing PDF extractor
    const pdfResult = await extractPdfText(buffer);

    const text = pdfResult?.text?.trim() || "";

    // STEP 2: decide if OCR is needed
    if (text.length > 20) {
        return {
            source: "pdf-extractor",
            text
        };
    }

    // STEP 3: fallback OCR
    const ocrText = await extractImageText(buffer);

    return {
        source: "ocr",
        text: ocrText
    };
};