import { useState } from "react";
import { IoClose } from "react-icons/io5";
import "./Submit.css";

const Submit = () => {
  const [images, setImages] = useState([]);
  //const [val, setVal] = useState(["1"]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-container">
      <div className="img-preview-container">
        {images.map((imgObj, index) => (
          <div key={index} className="img-container">
            <img src={imgObj.preview} alt="preview" />
            <IoClose
              onClick={() => handleRemoveImage(index)}
              className="remove-btn"
            >
              Remove
            </IoClose>
          </div>
        ))}
      </div>
      <form>
        <label>Input Images</label>
        <input
          type="file"
          accept="image/*"
          id=""
          multiple
          onChange={handleImageChange}
        />
        <label>Input PO</label>
        <input type="file" accept=".pdf" />
        <input
          type="text"
          id="purchase-order-number"
          name="purchase-order-number"
          maxLength="30"
          placeholder="purchase order #"
          required
        />
        <input
          type="text"
          id="company-name"
          name="company-name"
          autoComplete="organization"
          maxLength="100"
          placeholder="company name"
          required
        />
        <input type="date" id="entry-date" name="entry-date" />

        <input
          type="text"
          id="product"
          name="product"
          maxLength="25"
          placeholder="product"
          required
        />
        <input
          type="text"
          id="count"
          name="count"
          maxLength="10"
          placeholder="piece count"
          rerquired
        />
        <input
          type="text"
          id="weight"
          name="weight"
          maxLength="100"
          placeholder="weight"
          required
        />
        <div className="submit-btn" onClick={handleSubmit}>
          Submit
        </div>
      </form>
    </div>
  );
};

export default Submit;
