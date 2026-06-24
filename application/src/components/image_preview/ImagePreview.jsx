import "./ImagePreview.css";
import { IoClose } from "react-icons/io5";
import Label from "../label/Label";
import { useImageUploader } from "../../utility/imagePreview";

const ImagePreview = ({ setFormImages, formImages }) => {
  const { images, handleImageChange, handleRemoveImage } = useImageUploader();

  const handleChanges = (e) => {
    setFormImages(() => [...formImages, e.target.files]);

    // console.log(formImages);
  };

  return (
    <div className="img-preview-container" onChange={handleChanges}>
      {images.map((imgObj, index) => (
        <div key={index} className="img-container">
          <img src={imgObj.preview} alt="preview" />
          <IoClose
            onClick={() => handleRemoveImage(index)}
            className="remove-image"
          >
            Remove
          </IoClose>
        </div>
      ))}
      <Label isFor={"imageInput"} name={"Input Images"} />
      <input
        type="file"
        accept="image/*"
        id="imageInput"
        name="imageInput"
        multiple
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImagePreview;
