import { IoClose } from "react-icons/io5";
import "./ProductForm.css";

const ProductForm = ({ product, updateProduct, removeProduct }) => {
  return (
    <div className={`product__dynamic-container`} name="Product">
      <input
        type="text"
        name="product_name"
        placeholder="product"
        className={`product_dynamic-item ${product.quality >= 1 ? "product-match-warning" : ""}`}
        value={product.product_name || ""}
        onChange={(e) =>
          updateProduct(product.id, "product_name", e.target.value)
        }
      />

      <input
        type="text"
        name="quanity"
        placeholder="quantity"
        className={`product_dynamic-item ${product.quality >= 1 ? "product-match-warning" : ""}`}
        value={product.quantity}
        onChange={(e) => updateProduct(product.id, "quantity", e.target.value)}
      />

      <input
        type="text"
        name="unit_of_measurement"
        placeholder="unit of measurement"
        className={`product_dynamic-item ${product.quality >= 1 ? "product-match-warning" : ""}`}
        value={product.unit_of_measurement}
        onChange={(e) =>
          updateProduct(product.id, "unit_of_measurement", e.target.value)
        }
      />

      <IoClose
        className="remove-product"
        onClick={() => removeProduct(product.id)}
      />
    </div>
  );
};

export default ProductForm;
