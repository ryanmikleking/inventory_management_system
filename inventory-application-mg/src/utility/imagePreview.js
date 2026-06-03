import { useState } from "react";

export const useImageUploader = (initialState = []) => {
  const [images, setImages] = useState(initialState);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Map files to include a preview URL
    const fileObjects = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    // Append new images to the existing state
    setImages((prevImages) => [...prevImages, ...fileObjects]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  };
  //console.log(images);
  return {
    images,
    setImages,
    handleImageChange,
    handleRemoveImage,
  };
};
