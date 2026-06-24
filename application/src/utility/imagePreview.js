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
  const handlePreviousImages = (storedImages) => {
    const normalized = (storedImages || []).map((img) => {
      // case 1: string URL
      if (typeof img === "string") {
        return {
          file: null,
          preview: img,
        };
      }

      // case 2: object { url: "" } or similar
      return {
        file: null,
        preview: img.url || img.preview || "",
      };
    });

    setImages(normalized);
  };
  //console.log(images);
  return {
    images,
    setImages,
    handleImageChange,
    handleRemoveImage,
    handlePreviousImages,
  };
};
