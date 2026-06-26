import { useState } from "react";
import Button from "../button/Button";
import ImagePreview from "../image_preview/ImagePreview";
import UserInputTop from "./user_input_sections/Top/UserInputTop";
import UserInputBottom from "./user_input_sections/Bottom/UserInputBottom";
import ProductForm from "./product_form/ProductForm";
import "./Form.css";
const Form = () => {
  const [inputData, setInputData] = useState();
  const [imagesForSubmit, setImagesForSubmit] = useState([]);
  const [products, setProducts] = useState([
    {
      id: crypto.randomUUID(),
      productName: "",
      productQuantity: "",
      productWeight: "",
    },
  ]);
  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        productName: "",
        productQuantity: "",
        productWeight: "",
      },
    ]);
    console.log(products);
  };
  const updateProduct = (id, field, value) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, [field]: value } : product,
      ),
    );
  };
  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: files ? files[0]?.name : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Submit has been handled ${e}`);
  };
  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
        <ImagePreview
          setFormImages={setImagesForSubmit}
          formImages={imagesForSubmit}
          controlledInput={imagesForSubmit}
        />
        <UserInputTop
          inputData={inputData}
          handleInputChange={handleInputChange}
        />
        {products.map((item) => (
          <ProductForm
            key={item.id}
            product={item}
            updateProduct={updateProduct}
            removeProduct={removeProduct}
          />
        ))}
        <UserInputBottom
          inputData={inputData}
          handleInputChange={handleInputChange}
        />
        <div className="form__button-container">
          <Button btnName={"Add Product"} actionEvent={addProduct} />
          <Button btnName={"Submit"} />
        </div>
      </form>
    </div>
  );
};

export default Form;
