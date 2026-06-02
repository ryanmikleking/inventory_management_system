import { IoClose } from "react-icons/io5";
import "./ItemPreview.css";

const ItemPreview = ({ setView }) => {
  return (
    <div className="container">
      <IoClose className="close" onClick={setView}></IoClose>
      <h1>Item Preview</h1>
    </div>
  );
};

export default ItemPreview;
