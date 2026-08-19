import Label from "../../../label/Label";
import "./UserInputTop.css";

const UserInputTop = ({ inputData, handleInputChange, handleFileChange }) => {
  return (
    <div className="UserInputTop__container">
      <Label isFor={"poInput"} name={"PO Input"} />
      <input
        type="file"
        accept="image/*, application/pdf"
        id="poInput"
        name="files"
        multiple
        onChange={(e) => handleFileChange(e.target.files)}
      />
      {/* <select onChange={(e) => setNoInputFiles(Number(e.target.value))}>
        <option value="">Select a number</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select> */}
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
