//import React from 'react'
import "./ListView.css";
import { FaEdit } from "react-icons/fa";

const tableData = [
  { name: "Hubbel", po: "784", count: "78", weight: "10000", date: "9/7/2024" },
];

const ListView = () => {
  const data = tableData;
  let val = 0;
  return (
    <div className="list-container">
      <h2>History</h2>
      <table>
        <tr>
          <th>Entry No.</th>
          <th>Purchase Order No.</th>
          <th>Company Name</th>
          <th>Entry Date</th>
          <th>Edit/View</th>
        </tr>
        <tbody>
          {data.map((item) => (
            <tr key={val + 1}>
              <td>{val + 1}</td>
              <td>{item.po}</td>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td className="edit-icon">
                <FaEdit />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
