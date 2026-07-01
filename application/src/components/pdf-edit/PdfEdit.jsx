import "./PdfEdit.css";
import { useState, useRef } from "react";
import { useSinglePurchaseOrderService } from "../../utility/api_services/purchaseOrdersService";
import { FaPrint, FaFileDownload, FaEdit } from "react-icons/fa";
import { dateFormatter } from "../../utility/dateFormatter";
import { Loading } from "../loading/Loading";
import { useReactToPrint } from "react-to-print";
import { handleDownloadPDF } from "../../utility/downloadPDF";

export const PdfEdit = ({ setView, poId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const pageRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: pageRef,
  });
  const order = useSinglePurchaseOrderService(poId);
  if (!order || !order.po)
    return <Loading message={"Waiting for server to respond with data ...."} />;

  console.log(order);

  return (
    <div className="PdfEdit__container">
      <div className="PdfEdit__action-bar">
        <h3>Utility Bar</h3>
        {!isEdit ? (
          <div
            className="PdfEdit__icon-container"
            onClick={() => handleDownloadPDF(pageRef, poId)}
          >
            <FaPrint className="print-icon" onClick={handlePrint} />
            <FaFileDownload className="download-icon" />
            <FaEdit
              className="edit-icon"
              onClick={() => {
                setIsEdit(true);
              }}
            />
          </div>
        ) : (
          <div className="PdfEdit__Btn-container">
            <div
              className="PdfEdit__Btn PdfEdit__Btn-Cancel"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </div>

            <div
              className="PdfEdit__Btn PdfEdit__Btn-Submit"
              onClick={() => {
                // Save changes here
                setIsEdit(false);
                setView("table");
              }}
            >
              Submit
            </div>
          </div>
        )}
      </div>
      <div className="PdfEdit__outer-container">
        <div ref={pageRef} className="PdfEdit__page-container">
          <img src="/MG_Logo.png" alt="Company Logo" className="PdfEdit__img" />
          <p className="PdfEdit__page-heading">
            <span>4476 MO-5 & 240</span>
            <span>Glasgow, MO 65254</span>
            <span>+1 (660) 338-2243</span>
          </p>
          <div className="PdfEdit__data-return">
            <p className="PdfEdit__company-name">
              Company Name: {order.po.company_name || ""}
            </p>
            <p className="PdfEdit__purchase-order-no">
              Purchase Order Number: {order.po.purchase_order_number || ""}
            </p>
            <p className="PdfEdit__created-at">
              Date: {dateFormatter(order.po.created_at) || ""}
            </p>
            <div className="PdfEdit__product-containers">
              {order.products.map((product, index) => (
                <div className="PdfEdit__product" key={product.product_id}>
                  <p>Product {index}</p>
                  <p>Product Name: {product.product_name}</p>
                  <p>Product Quanity: {product.quantity}</p>
                  <p>Product Weight: {product.weight}</p>
                </div>
              ))}
            </div>

            {order.po.quality_check ? (
              <h1 className="PdfEdit__Approved">
                ✅ This Purchase Order is Approved‼️
              </h1>
            ) : (
              <h1 className="PdfEdit__Discrepancy">
                🚫 This Purchase Order is in Discrepancy‼️
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
