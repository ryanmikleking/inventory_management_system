//import React from 'react'
import "./ListView.css";
import { FaEdit } from "react-icons/fa";
import { getLocalSubmissions } from "../../utility/localStorage";
import { DataFormater } from "../../utility/dataFormater";

// const tableData = [
//   {
//     id: 1,
//     companyName: "Hubbel",
//     inputPo: "784",
//     productQuanity: "78",
//     productWeight: "10000",
//     entryDate: "9/7/2024",
//   },
//   {
//     id: 2,
//     companyName: "Hubbel",
//     inputPo: "784",
//     productQuanity: "78",
//     productWeight: "10000",
//     entryDate: "9/7/2024",
//   },
//   {
//     id: 3,
//     companyName: "Hubbel",
//     inputPo: "784",
//     productQuanity: "78",
//     productWeight: "10000",
//     entryDate: "9/7/2024",
//   },
//   {
//     id: 4,
//     companyName: "Hubbel",
//     inputPo: "784",
//     productQuanity: "78",
//     productWeight: "10000",
//     entryDate: "9/7/2024",
//   },
//   {
//     id: 5,
//     companyName: "Hubbel",
//     inputPo: "784",
//     productQuanity: "78",
//     productWeight: "10000",
//     entryDate: "9/7/2024",
//   },
//   {
//     id: 6,
//     companyName: "Hubbel",
//     inputPo: "784",
//     productQuanity: "78",
//     productWeight: "10000",
//     entryDate: "9/7/2024",
//   },
//   {
//     id: 7,
//     companyName: "Hubbel",
//     inputPo: "784",
//     productQuanity: "78",
//     productWeight: "10000",
//     entryDate: "9/7/2024",
//   },
//   {
//     id: 8,
//     companyName: "Hubbel",
//     inputPo: "784",
//     productQuanity: "78",
//     productWeight: "10000",
//     entryDate: "9/7/2024",
//   },
//   {
//     id: 9,
//     companyName: "Wabash",
//     inputPo: "678",
//     productQuanity: "98",
//     productWeight: "150entrD",
//     entryDate: "10/1/2026",
//   },
//   {
//     id: 10,
//     companyName: "Wabash",
//     inputPo: "678",
//     productQuanity: "98",
//     productWeight: "150entryD",
//     entryDate: "10/1/2026",
//   },
// ];

const ListView = ({ setView }) => {
  console.log(typeof tableData);
  const localData = getLocalSubmissions();

  const [dataObj, images, products] = DataFormater(localData);
  console.log(images, products);
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
          {dataObj.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.poInput}</td>
              <td>{item.companyName}</td>
              <td>{item.entryDate}</td>
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
