import { IoClose } from "react-icons/io5";
import "./ProductForm.css";
const ProductForm = ({ product, updateProduct, removeProduct }) => {
  return (
    <div className="product__dynamic-container" name="Product">
      <input
        type="text"
        name="productName"
        placeholder="product"
        className="product__dynamic-item"
        value={product.productName || ""}
        onChange={(e) =>
          updateProduct(product.id, "productName", e.target.value)
        }
      />
      <input
        type="text"
        name="productQuantity"
        placeholder="quantity"
        className="product__dynamic-item"
        value={product.productQuantity || ""}
        onChange={(e) =>
          updateProduct(product.id, "productQuantity", e.target.value)
        }
      />
      <input
        type="text"
        name="productWeight"
        placeholder="weight"
        className="product__dynamic-item"
        value={product.productWeight || ""}
        onChange={(e) =>
          updateProduct(product.id, "productWeight", e.target.value)
        }
      />
      <IoClose
        className="remove-product"
        onClick={() => removeProduct(product.id)}
      ></IoClose>
    </div>
  );
};

export default ProductForm;
