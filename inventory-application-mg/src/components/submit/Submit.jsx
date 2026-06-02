import { useState } from "react";
import { IoClose } from "react-icons/io5";
//import imagePreview from "../../utility/imagePreview";
import "./Submit.css";

const Submit = () => {
  const [images, setImages] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  // const [formData, setFormData] = useState([
  //   {
  //     images: [],
  //     purchaseOrder: [],
  //     poNo: "",
  //     companyName: "",
  //     date: "",
  //     product:
  //       {
  //         productName: "",
  //         quanity: "",
  //         weight: "",
  //       }[],

  //   },
  // ]);

  // const [formData, setFormData] = useState([
  //   {
  //     name: "",
  //   },
  // ]);

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

  const addInputField = (e) => {
    e.preventDefault();
    const newId = inputFields.length + 1;
    setInputFields([...inputFields, { id: newId }]);
    console.log(inputFields.length);
  };

  const handleRemoveProduct = (indexToRemove) => {
    setInputFields((prevInputFields) =>
      prevInputFields.filter((_, index) => index !== indexToRemove),
    );
  };

  // const handleChange = () => {
  //   //handleImageChange(e);
  //   console.log(formData);
  // };
  // const handleInputChange = (index, event) => {
  //   const updatedFields = [...inputFields];
  //   updatedFields[index][event.target.value] = event.target.value;
  //   console.log(updatedFields);
  //   setInputFields(updatedFields);
  // };

  //const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    // const [images, purchaseOrder, poNo, companyName, date] = e.target;
    // setFormData(...formData, {
    //   images,
    //   purchaseOrder,
    //   poNo,
    //   companyName,
    //   date,
    //   product,
    // });
    // console.log(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="img-preview-container">
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
        </div>
        <label htmlFor="image-input">Input Images</label>
        <input
          type="file"
          accept="image/*"
          id="image-input"
          multiple
          onChange={handleImageChange}
        />
        <label htmlFor="po-input">Input PO</label>
        <input type="file" accept=".pdf" name="po-input" id="po-input" />
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
        {inputFields.map((item, index) => (
          <div className="dynamic-container" key={item.id}>
            <input
              type="text"
              name={`#${item.id}_product`}
              placeholder="product"
              className="dynamic-item"
            />
            <input
              type="text"
              name={`#${item.id}_quanity`}
              placeholder="quanity"
              className="dynamic-item"
            />
            <input
              type="text"
              name={`#${item.id}_weight`}
              placeholder="weight"
              className="dynamic-item"
            />
            <IoClose
              className="remove-product"
              onClick={() => handleRemoveProduct(index)}
            ></IoClose>
          </div>
        ))}
        <div className="btn add_product_btn" onClick={addInputField}>
          + Add Product
        </div>
        <div className="btn submit-btn" onClick={handleSubmit}>
          Submit
        </div>
      </form>
    </div>
  );
};

export default Submit;
