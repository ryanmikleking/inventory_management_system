import Label from "../../../label/Label";
import "./UserInputTop.css";
const user_input_top = ({ inputData, handleInputChange }) => {
  return (
    <div className="UserInputTop__container">
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

export default user_input_top;
