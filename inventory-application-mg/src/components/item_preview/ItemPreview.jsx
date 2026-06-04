import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useDynamicInputs } from "../../utility/dynamicInput";
import ImagePreview from "../image_preview/ImagePreview";
import Label from "../label/Label";
import Button from "../button/Button";
import ButtonDisabled from "../buttonDisabled/ButtonDisabled";
import "./ItemPreview.css";
import { FaEdit } from "react-icons/fa";

const ItemPreview = ({ setView }) => {
  const { inputFields, addInputField, handleRemoveField } = useDynamicInputs();
  const [imagesForSubmit, setImagesForSubmit] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const handleIsActive = () => {
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleSubmit = () => {
    //console.log(imagesForSubmit);
    console.log("submitting...");
    // console.log(inputData);
    // console.log(products);
  };
  return (
    <div className="form-container">
      <div className="close-btn">
        <FaEdit className="edit" onClick={handleIsActive} />
        <IoClose className="close" onClick={setView}></IoClose>
      </div>

      <form>
        <ImagePreview
          setFormImages={setImagesForSubmit}
          formImages={imagesForSubmit}
        />
        <Label isFor={"poInput"} name={"poInput"} />
        <input
          type="file"
          accept=".pdf"
          name="poInput"
          id="poInput"
          disabled={isActive}
          //   onChange={handleInputChange}
        />
        <input
          type="text"
          id="purchaseOrder"
          name="purchaseOrder"
          maxLength="30"
          placeholder="purchase order #"
          disabled={isActive}
          // onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="companyName"
          name="companyName"
          maxLength="100"
          placeholder="company name"
          disabled={isActive}
          // onChange={handleInputChange}
          // required
        />
        <input
          type="date"
          id="entryDate"
          name="entryDate"
          disabled={isActive}
          //   onChange={handleInputChange}
        />
        {inputFields.map((item, index) => (
          <div
            className="dynamic-container"
            name={`product#${item.id}`}
            key={item.id}
          >
            <input
              type="text"
              name="productName"
              placeholder="product"
              className="dynamic-item"
              disabled={isActive}
              // onChange={(e) => handleProductChange(e, index)}
            />
            <input
              type="text"
              name="productQuanity"
              placeholder="quanity"
              className="dynamic-item"
              disabled={isActive}
              // onChange={(e) => handleProductChange(e, index)}
            />
            <input
              type="text"
              name="productWeight"
              placeholder="weight"
              className="dynamic-item"
              disabled={isActive}
              // onChange={(e) => handleProductChange(e, index)}
            />
            <IoClose
              className="remove-product"
              onClick={() => handleRemoveField(index)}
            ></IoClose>
          </div>
        ))}
        {!isActive ? (
          <div className="button-container">
            <Button btnName={"Add Product"} funClick={addInputField} />
            <Button btnName={"Submit"} funClick={handleSubmit} />
          </div>
        ) : (
          <div className="button-container">
            <ButtonDisabled btnName={"Add Product"} />
            <ButtonDisabled btnName={"Submit"} />
          </div>
        )}
      </form>
    </div>
  );
};

export default ItemPreview;
