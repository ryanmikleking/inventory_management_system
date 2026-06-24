export const returnFileBlob = async (imagePath) => {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  //const file = new File([blob], fileName, { type: blob.type });
  return blob;
};
export const returnFile = async (imagePath, fileName) => {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
export const fileToBase64 = async (files) => {
  const images = await Promise.all(
    files.map(async (file) => ({
      name: file.name,
      preview: await toBase64(file),
    })),
  );

  const existing = JSON.parse(localStorage.getItem("submissions")) || [];

  localStorage.setItem(
    "submissions",
    JSON.stringify([...existing, { images }]),
  );
};
