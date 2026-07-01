//import React from 'react'
import "./ListView.css";
import { FaRegFilePdf } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";
import { usePurchaseOrdersService } from "../../utility/api_services/purchaseOrdersService";
import { dateFormatter } from "../../utility/dateFormatter";
import { GrPrevious, GrNext  } from "react-icons/gr";

const ListView = ({ setView, setPoId }) => {
  const purchaseOrders = usePurchaseOrdersService();
  const safeOrders = Array.isArray(purchaseOrders) ? purchaseOrders : [];
  const onClickHandler = (poId, view) => {
    console.log(poId);
    setPoId(poId);
    setView(view);
  };
  return (
    <div className="list-container">
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
          {safeOrders.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.purchase_order_number}</td>
              <td>{item.company_name}</td>
              <td>{dateFormatter(item.created_at)}</td>
              <td className="edit-icon">
                <div
                  className="listView__pdfIcon"
                  onClick={() => {
                    onClickHandler(item.po_id, "pdf-edit");
                  }}
                >
                  <FaRegFilePdf />
                </div>
                <div
                  className="listView__addImgIcon"
                  onClick={() => setView("img-upload")}
                >
                  <LuImagePlus />
                </div>
                <div
                  className="listView__imgIcon"
                  onClick={() => setView("show-img")}
                >
                  <IoImageOutline />
                </div>
              </td>
            </tr>
          ))}
          <tr className="buttons-table-row"><td colSpan={5}><GrPrevious className="prev"/><GrNext className="next"/></td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
