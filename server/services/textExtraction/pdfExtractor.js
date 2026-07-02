import PdfParse from "pdf-parse";

export const extractPdfText = async (buffer) => {
  try {
    const data = await PdfParse(buffer);

    return data.text.trim();
  } catch (error) {
    throw new Error(`Failed to extract PDF text: ${error.message}`);
  }
};
