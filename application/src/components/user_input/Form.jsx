const Form = () => {
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: files ? files[0]?.name : value,
    }));
  };
  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
        <ImagePreview
          setFormImages={setImagesForSubmit}
          formImages={imagesForSubmit}
          controlledInput={imagesForSubmit}
        />
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
          value={inputData.purchaseOrder}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="companyName"
          name="companyName"
          maxLength="100"
          placeholder="company name"
          value={inputData.companyName}
          onChange={handleInputChange}
          required
        />
        {inputFields.map((item, index) => (
          <div
            className="dynamic-container"
            name="Product"
            key={item.id}
            onChange={(e) => handleProductChange(e, index)}
          >
            <input
              type="text"
              name="productName"
              placeholder="product"
              className="dynamic-item"
              value={products[index]?.productName || ""}
              onChange={(e) => handleProductChange(e, index)}
            />
            <input
              type="text"
              name="productQuanity"
              placeholder="quanity"
              className="dynamic-item"
              value={products[index]?.productQuanity}
              onChange={(e) => handleProductChange(e, index)}
            />
            <input
              type="text"
              name="productWeight"
              placeholder="weight"
              className="dynamic-item"
              value={products[index]?.productWeight}
              onChange={(e) => handleProductChange(e, index)}
            />
            <IoClose
              className="remove-product"
              onClick={() => handleRemoveField(index)}
            ></IoClose>
          </div>
        ))}

        <textarea
          className="notesInput"
          name="userNotes"
          placeholder="Enter notes here..."
          onChange={handleInputChange}
          value={inputData.userNotes}
        />
        <div className="radio-input">
          <label className="radioLabel">
            <input
              type="radio"
              className="radio"
              name="qualityCheck"
              value={inputData.qualityCheck}
              onChange={handleInputChange}
            />
            Approved
          </label>
          <label className="radioLabel">
            <input
              type="radio"
              className="radio"
              name="qualityCheck"
              value={inputData.qualityCheck}
              onChange={handleInputChange}
            />
            Discrepency
          </label>
        </div>
        <div className="button-container">
          <Button
            btnName={"Add Product"}
            funClick={addInputField}
            btnType={true}
          />
          <Button
            btnName={"Submit"}
            funClick={(e) => handleSubmit(e)}
            btnType={true}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
