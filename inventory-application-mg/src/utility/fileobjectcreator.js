const getFileFromPath = async (imagePath, fileName) => {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};
export default getFileFromPath;
