import ImagePreview from "../image_preview/ImagePreview";
import "./ImageUpload.css";
const ImageUpload = ({ setView }) => {
  return (
    <div className="ImageUpload__container">
      <ImagePreview />
      <button onClick={() => setView("table")}>Go Back</button>
    </div>
  );
};

export default ImageUpload;
