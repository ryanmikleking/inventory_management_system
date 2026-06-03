import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useDynamicInputs } from "../../utility/dynamicInput";
import ImagePreview from "../image_preview/ImagePreview";
import Label from "../label/Label";
import Button from "../button/Button";
import "./Submit.css";

const Submit = () => {
  const { inputFields, addInputField, handleRemoveField } = useDynamicInputs();
  const [imagesForSubmit, setImagesForSubmit] = useState([]);
  const [products, setProducts] = useState([
    {
      id: 1,
      productName: "",
      productQuanity: "",
      productWeight: "",
    },
  ]);
  const [inputData, setInputData] = useState({
    poInput: "",
    purchaseOrder: "",
    companyName: "",
    entryDate: "",
  });

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFields = [...inputFields];
    updatedFields[index] = { ...updatedFields[index], [name]: value };
    setProducts(updatedFields);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    //console.log(imagesForSubmit);
    console.log(inputData);
    console.log(products);
  };

  return (
    <div className="form-container">
      <form>
        <ImagePreview
          setFormImages={setImagesForSubmit}
          formImages={imagesForSubmit}
        />
        <Label isFor={"po-input"} name={"Input PO"} />
        <input
          type="file"
          accept=".pdf"
          name="poInput"
          id="poInput"
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="purchaseOrder"
          name="purchaseOrder"
          maxLength="30"
          placeholder="purchase order #"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="companyName"
          name="companyName"
          maxLength="100"
          placeholder="company name"
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          id="entryDate"
          name="entryDate"
          onChange={handleInputChange}
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
              onChange={(e) => handleProductChange(e, index)}
            />
            <input
              type="text"
              name="productQuanity"
              placeholder="quanity"
              className="dynamic-item"
              onChange={(e) => handleProductChange(e, index)}
            />
            <input
              type="text"
              name="productWeight"
              placeholder="weight"
              className="dynamic-item"
              onChange={(e) => handleProductChange(e, index)}
            />
            <IoClose
              className="remove-product"
              onClick={() => handleRemoveField(index)}
            ></IoClose>
          </div>
        ))}
        <div className="button-container">
          <Button btnName={"Add Product"} funClick={addInputField} />
          <Button btnName={"Submit"} funClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default Submit;
