//import React from 'react'
import "./ListView.css";
//import { FaEdit } from "react-icons/fa";

const ListView = () => {
  return (
    <div className="list-container">
      <h2 id="history-title">History</h2>
      <h1>this will be a table full of shit</h1>
      {/* <table>
        <thead>
          <tr>
            <th>Entry No.</th>
            <th>Purchase Order No.</th>
            <th>Company Name</th>
            <th>Entry Date</th>
            <th>Edit/View</th>
          </tr>
        </thead>

        <tbody>
          this will be some table shit
          {localData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.purchaseOrder}</td>
              <td>{item.companyName}</td>
              <td>{item.entryDate}</td>
              <td className="edit-icon">
                <FaEdit onClick={() => listActions(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default ListView;
