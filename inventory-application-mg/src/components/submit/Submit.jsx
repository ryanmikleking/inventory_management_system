//import React from 'react'
import "./Submit.css";

const Submit = () => {
  return (
    <div className="form-container">
      <div className="img-preview-container"></div>
      <form>
        <input
          type="text"
          id="company-name"
          name="company-name"
          autoComplete="organization"
          maxLength="100"
          placeholder="company name"
          required
        />
        <input
          type="text"
          id="purchase-order-number"
          name="purchase-order-number"
          maxLength="30"
          placeholder="purchase order #"
          required
        />
        <input
          type="text"
          id="count"
          name="count"
          maxLength="10"
          placeholder="piece count"
          rerquired
        />
        <input
          type="text"
          id="weight"
          name="weight"
          maxLength="100"
          placeholder="weight"
          required
        />
        <input type="date" id="entry-date" name="entry-date" />
      </form>
    </div>
  );
};

export default Submit;
