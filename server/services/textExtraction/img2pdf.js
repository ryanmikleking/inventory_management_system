import { PDFDocument } from "pdf-lib";

export async function imageToPdf(imageBuffer, mimeType) {
  const pdfDoc = await PDFDocument.create();

  let image;

  if (mimeType === "image/png") {
    image = await pdfDoc.embedPng(imageBuffer);
  } else if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
    image = await pdfDoc.embedJpg(imageBuffer);
  } else {
    throw new Error("Unsupported image type");
  }

  const { width, height } = image.scale(1);

  const page = pdfDoc.addPage([width, height]);

  page.drawImage(image, {
    x: 0,
    y: 0,
    width,
    height,
  });

  const pdfBytes = await pdfDoc.save();
  console.log("img2pdf: ", Buffer.from(pdfBytes) instanceof Buffer);

  return Buffer.from(pdfBytes);
}
