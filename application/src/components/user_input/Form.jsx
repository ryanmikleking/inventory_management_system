import { useState } from "react";
import Button from "../button/Button";
import ImagePreview from "../image_preview/ImagePreview";
import UserInputTop from "./user_input_sections/Top/UserInputTop";
import UserInputBottom from "./user_input_sections/Bottom/UserInputBottom";
import ProductForm from "./product_form/ProductForm";
import { useImageUploader } from "../../utility/imagePreview";
import { useExtractPurchaseOrder } from "../../utility/api_services/purchaseOrdersService";
import { Loading } from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Form.css";
import { useCreatePurchaseOrderService } from "../../utility/api_services/purchaseOrdersService";

const Form = () => {
  const [inputData, setInputData] = useState({
    company_name: "",
    purchase_order: "",
    po_file: File,
    notes: "",
    quality_check: false,
  });
  const { uploadPurchaseOrder, extractLoading } = useExtractPurchaseOrder();
  const { createLoading, createOrder } = useCreatePurchaseOrderService();
  const navigate = useNavigate();
  const { images, handleImageChange, handleRemoveImage } = useImageUploader();
  const [products, setProducts] = useState([
    {
      id: uuidv4(),
      product_name: "",
      quantity: "",
      unit_of_measurement: "",
      quality: "",
    },
  ]);

  const handleFileChange = async (file) => {
    if (!file) {
      console.log("No file selected");
      return;
    }
    console.log("Sent to axios");
    const data = await uploadPurchaseOrder(file);

    if (!data) return;

    setInputData({
      company_name: data.data.companyName,
      purchase_order: data.data.purchaseOrder.purchaseOrder,
      po_file: file,
      notes: "",
      quality_check: false,
    });

    setProducts(
      data.data.products.map((product) => ({
        id: uuidv4(),
        product_name: product?.outgoing_product_no,
        quantity: product?.quantity,
        unit_of_measurement: product?.unit,
        quality: product?.quality,
      })),
    );
  };
  if (extractLoading || createLoading)
    return <Loading message="Waiting for server to respond with data..." />;
  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        id: uuidv4(),
        productName: "",
        productQuantity: "",
        productWeight: "",
      },
    ]);
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
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("company_name", inputData.company_name);
      formData.append("purchase_order_number", inputData.purchase_order);
      formData.append("notes", inputData.notes);
      formData.append("quality_check", inputData.quality_check);
      console.log("This is the file:", inputData.po_file);
      const pdfBlob = new Blob([inputData.po_file], {
        type: "application/pdf",
      });
      formData.append(
        "files",
        new File([pdfBlob], `${inputData.purchase_order}.pdf`, {
          type: "application/pdf",
          lastModified: Date.now(),
        }),
      );

      let count = 0;

      images.forEach((file) => {
        count++;
        const blob = new Blob([file.file], { type: file.file.type });
        formData.append(
          "files",
          new File([blob], `${inputData.purchase_order}-${count}.jpg`, {
            type: `image/jpg`,
            lastModified: Date.now(),
          }),
        );
      });
      const cleanedProducts = products.map((product) => ({
        ...product,
        quantity: product.quantity === "" ? null : Number(product.quantity),
        weight: product.weight === "" ? null : Number(product.weight),
      }));

      formData.append("products", JSON.stringify(cleanedProducts));
      const response = await createOrder(formData);
      const userConfirmed = confirm("Submitted. Click Okay to continue...");
      if (userConfirmed) {
        if (response.status === 201 || response.status === 200) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
        <ImagePreview
          images={images}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
        />
        <UserInputTop
          inputData={inputData}
          handleInputChange={handleInputChange}
          setProducts={setProducts}
          handleFileChange={handleFileChange}
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
          <Button btnName={"Submit"} actionEvent={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default Form;
