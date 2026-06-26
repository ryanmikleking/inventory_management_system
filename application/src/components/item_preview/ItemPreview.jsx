import { IoClose } from "react-icons/io5";
import { useState } from "react";
import "./ItemPreview.css";
import { FaEdit } from "react-icons/fa";
import Form from "../user_input/Form";

const ItemPreview = ({ setView }) => {
  const [isActive, setIsActive] = useState(true);

  const handleIsActive = () => {
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  return (
    <div className="form-container">
      <div className="close-btn">
        <FaEdit className="edit" onClick={handleIsActive} />
        <IoClose className="close" onClick={setView}></IoClose>
      </div>
      <Form />
    </div>
  );
};

export default ItemPreview;
