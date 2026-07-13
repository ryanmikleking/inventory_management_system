import Label from "../../../label/Label";
import "./UserInputTop.css";

const UserInputTop = ({ inputData, handleInputChange, handleFileChange }) => {
  return (
    <div className="UserInputTop__container">
      <Label isFor={"poInput"} name={"PO Input"} />
      <input
        type="file"
        accept=".pdf, application/pdf"
        id="poInput"
        name="files"
        onChange={(e) => handleFileChange(e.target.files[0])}
      />
      <input
        type="text"
        id="purchaseOrder"
        name="purchaseOrder"
        maxLength="30"
        placeholder="purchase order #"
        value={inputData.purchase_order}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        id="companyName"
        name="companyName"
        maxLength="100"
        placeholder="company name"
        value={inputData.company_name}
        onChange={handleInputChange}
        required
      />
    </div>
  );
};

export default UserInputTop;
