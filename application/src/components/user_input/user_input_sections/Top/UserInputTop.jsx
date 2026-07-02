import Label from "../../../label/Label";
import { useState } from "react";
import "./UserInputTop.css";

import { useExtractPurchaseOrder } from "../../../../utility/api_services/purchaseOrdersService";

const UserInputTop = ({ inputData, handleInputChange }) => {
  const [fileInput, setFileInput] = useState(null);
  const { automatedInput, error, uploadPurchaseOrder } =
    useExtractPurchaseOrder();
  const handleFileChange = async (e) => {
    console.log(e.target.files[0]);
    setFileInput(e.target.files[0]);
    await uploadPurchaseOrder(fileInput);
    // console.log(loading);
    // if (loading)
    //   return (
    //     <Loading message={"Waiting for server to respond with data ...."} />
    //   );
    console.log(automatedInput, error);
  };
  console.log(typeof setFileInput);
  return (
    <div className="UserInputTop__container">
      <Label isFor={"poInput"} name={"PO Input"} />
      <input
        type="file"
        accept=".pdf, application/pdf"
        id="poInput"
        onChange={(e) => handleFileChange(e)}
      />
      <input
        type="text"
        id="purchaseOrder"
        name="purchaseOrder"
        maxLength="30"
        placeholder="purchase order #"
        value={inputData?.purchaseOrder || ""}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        id="companyName"
        name="companyName"
        maxLength="100"
        placeholder="company name"
        value={inputData?.companyName}
        onChange={handleInputChange}
        required
      />
    </div>
  );
};

export default UserInputTop;
