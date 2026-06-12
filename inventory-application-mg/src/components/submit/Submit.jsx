import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useDynamicInputs } from "../../utility/dynamicInput";
import ImagePreview from "../image_preview/ImagePreview";
import Label from "../label/Label";
import getFileFromPath from "../../utility/fileobjectcreator";
import generateRandomString from "../../utility/stringCreator";
import Button from "../button/Button";
import { LocalDataStore } from "../../utility/localStorage";
import "./Submit.css";

const Submit = () => {
  const { inputFields, addInputField, handleRemoveField } = useDynamicInputs();
  const [imagesForSubmit, setImagesForSubmit] = useState([]);
  const [products, setProducts] = useState([
    {
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
    userNotes: "",
    qualityCheck: "",
  });

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setProducts(updatedProducts);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: files ? files[0]?.name : value,
    }));
  };

  const handleClear = () => {
    setProducts([
      {
        productName: "",
        productQuanity: "",
        productWeight: "",
      },
    ]);
    setImagesForSubmit([]);
    setInputData({
      poInput: "",
      purchaseOrder: "",
      companyName: "",
      entryDate: "",
      userNotes: "",
      qualityCheck: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const dataToSubmit = {
    //   images: imagesForSubmit,
    //   ...inputData,
    //   products,
    // };

    for (let i = 0; i <= 20; i++) {
      const file1 = getFileFromPath("/DSC_0064.JPG", "file-01");
      const file2 = getFileFromPath("/painting.png", "file-02");
      const file3 = getFileFromPath("/invoice.pdf", "file-03");
      const poObj = {
        images: [file1, file2],
        poInput: file3,
        purchaseOrder: generateRandomString(10),
        companyName: generateRandomString(10),
        entryDate: "2026/04/11",
        userNotes: generateRandomString(25),
        qualityCheck: true,
        products: [
          {
            productName: generateRandomString(10),
            productQuanity: generateRandomString(10),
            productWeight: generateRandomString(10),
          },
          {
            productName: generateRandomString(10),
            productQuanity: generateRandomString(10),
            productWeight: generateRandomString(10),
          },
        ],
      };
      LocalDataStore(poObj);
    }

    //LocalDataStore(dataToSubmit);

    console.log(JSON.parse(localStorage.getItem("submissions")));
    handleClear();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <ImagePreview
          setFormImages={setImagesForSubmit}
          formImages={imagesForSubmit}
          controlledInput={imagesForSubmit}
        />
        <Label isFor={"poInput"} name={"PO Input"} />
        <input
          type="file"
          accept=".pdf, application/pdf"
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
          value={inputData.purchaseOrder}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="companyName"
          name="companyName"
          maxLength="100"
          placeholder="company name"
          value={inputData.companyName}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          id="entryDate"
          name="entryDate"
          value={inputData.entryDate}
          onChange={handleInputChange}
        />
        {inputFields.map((item, index) => (
          <div
            className="dynamic-container"
            name="Product"
            key={item.id}
            onChange={(e) => handleProductChange(e, index)}
          >
            <input
              type="text"
              name="productName"
              placeholder="product"
              className="dynamic-item"
              value={products[index]?.productName || ""}
              onChange={(e) => handleProductChange(e, index)}
            />
            <input
              type="text"
              name="productQuanity"
              placeholder="quanity"
              className="dynamic-item"
              value={products[index]?.productQuanity}
              onChange={(e) => handleProductChange(e, index)}
            />
            <input
              type="text"
              name="productWeight"
              placeholder="weight"
              className="dynamic-item"
              value={products[index]?.productWeight}
              onChange={(e) => handleProductChange(e, index)}
            />
            <IoClose
              className="remove-product"
              onClick={() => handleRemoveField(index)}
            ></IoClose>
          </div>
        ))}

        <textarea
          className="notesInput"
          name="userNotes"
          placeholder="Enter notes here..."
          onChange={handleInputChange}
          value={inputData.userNotes}
        />
        <div className="radio-input">
          <label className="radioLabel">
            <input
              type="radio"
              className="radio"
              name="qualityCheck"
              value={inputData.qualityCheck}
              onChange={handleInputChange}
            />
            Approved
          </label>
          <label className="radioLabel">
            <input
              type="radio"
              className="radio"
              name="qualityCheck"
              value={inputData.qualityCheck}
              onChange={handleInputChange}
            />
            Discrepency
          </label>
        </div>
        <div className="button-container">
          <Button
            btnName={"Add Product"}
            funClick={addInputField}
            btnType={true}
          />
          <Button
            btnName={"Submit"}
            funClick={(e) => handleSubmit(e)}
            btnType={true}
          />
        </div>
      </form>
    </div>
  );
};

export default Submit;
