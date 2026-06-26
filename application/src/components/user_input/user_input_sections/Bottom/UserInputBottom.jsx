import "./UserInputBottom.css";
const UserInputBottom = ({ inputData, handleInputChange }) => {
  return (
    <div className="UserInputBottom__container">
      <textarea
        className="notesInput"
        name="userNotes"
        placeholder="Enter notes here..."
        onChange={handleInputChange}
        // value={inputData.userNotes}
      />
      <div className="radio-input">
        <label className="radioLabel">
          <input
            type="radio"
            className="radio"
            name="qualityCheck"
            value={inputData?.qualityCheck}
            onChange={handleInputChange}
          />
          Approved
        </label>
        <label className="radioLabel">
          <input
            type="radio"
            className="radio"
            name="qualityCheck"
            value={inputData?.qualityCheck}
            onChange={handleInputChange}
          />
          Discrepency
        </label>
      </div>
    </div>
  );
};

export default UserInputBottom;
