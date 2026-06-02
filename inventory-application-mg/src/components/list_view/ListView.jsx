//import React from 'react'
import "./ListView.css";
import { FaEdit } from "react-icons/fa";

const tableData = [
  {
    key: 1,
    name: "Hubbel",
    po: "784",
    count: "78",
    weight: "10000",
    date: "9/7/2024",
  },
  {
    key: 2,
    name: "Hubbel",
    po: "784",
    count: "78",
    weight: "10000",
    date: "9/7/2024",
  },
  {
    key: 3,
    name: "Hubbel",
    po: "784",
    count: "78",
    weight: "10000",
    date: "9/7/2024",
  },
  {
    key: 4,
    name: "Hubbel",
    po: "784",
    count: "78",
    weight: "10000",
    date: "9/7/2024",
  },
  {
    key: 5,
    name: "Hubbel",
    po: "784",
    count: "78",
    weight: "10000",
    date: "9/7/2024",
  },
  {
    key: 6,
    name: "Hubbel",
    po: "784",
    count: "78",
    weight: "10000",
    date: "9/7/2024",
  },
  {
    key: 7,
    name: "Hubbel",
    po: "784",
    count: "78",
    weight: "10000",
    date: "9/7/2024",
  },
  {
    key: 8,
    name: "Hubbel",
    po: "784",
    count: "78",
    weight: "10000",
    date: "9/7/2024",
  },
  {
    key: 9,
    name: "Wabash",
    po: "678",
    count: "98",
    weight: "1500",
  },
  {
    key: 10,
    name: "Wabash",
    po: "678",
    count: "98",
    weight: "1500",
  },
];

const ListView = ({ setView }) => {
  const data = tableData;

  return (
    <div className="list-container">
      <h2>History</h2>
      <table>
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
          {data.map((item) => (
            <tr key={item.key}>
              <td>{item.key}</td>
              <td>{item.po}</td>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td className="edit-icon">
                <FaEdit onClick={setView} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
