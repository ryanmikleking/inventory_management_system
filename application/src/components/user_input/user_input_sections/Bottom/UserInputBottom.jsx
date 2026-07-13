import "./UserInputBottom.css";
const UserInputBottom = ({ inputData, handleInputChange }) => {
  return (
    <div className="UserInputBottom__container">
      <textarea
        className="notesInput"
        name="notes"
        placeholder="Enter notes here..."
        onChange={handleInputChange}
        value={inputData.notes || ""}
      />
      <div className="radio-input">
        <label className="radioLabel">
          <input
            type="radio"
            className="radio true"
            name="quality_check"
            value={true}
            onChange={handleInputChange}
          />
          Approved
        </label>
        <label className="radioLabel">
          <input
            type="radio"
            className="radio false"
            name="quality_check"
            value={false}
            onChange={handleInputChange}
          />
          Discrepency
        </label>
      </div>
    </div>
  );
};

export default UserInputBottom;
