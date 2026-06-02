// const imagePreview = (images, setImages) => {
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);

//     // Map files to include a preview URL
//     const fileObjects = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));

//     // Append new images to the existing state
//     setImages((prevImages) => [...prevImages, ...fileObjects]);
//   };
//   const handleRemoveImage = (indexToRemove) => {
//     setImages((prevImages) =>
//       prevImages.filter((_, index) => index !== indexToRemove),
//     );
//   };
// };
// export default imagePreview;
