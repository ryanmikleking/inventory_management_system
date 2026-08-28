import "./PdfEdit.css";
import { useState, useRef } from "react";
import { useSinglePurchaseOrderService } from "../../utility/api_services/purchaseOrdersService";
import { FaPrint, FaEdit } from "react-icons/fa";
import { dateFormatter } from "../../utility/dateFormatter";
import { Loading } from "../loading/Loading";
import { useReactToPrint } from "react-to-print";
import { useUpdatePurchaseOrderService } from "../../utility/api_services/purchaseOrdersService";
// import { handleDownloadPDF } from "../../utility/downloadPDF";

export const PdfEdit = ({ setView, poId }) => {
  const { updatePurchaseOrder, updateLoading, updateError } =
    useUpdatePurchaseOrderService();
  const [isEdit, setIsEdit] = useState(false);

  const [editData, setEditData] = useState({
    purchase_order_number: "",
    internal_po_number: "",
    discrepancy: false,
  });

  const [products, setProducts] = useState([]);
  const order = useSinglePurchaseOrderService(poId);
  console.log(order);

  const pageRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: pageRef,
  });

  const handleEdit = () => {
    setEditData({
      purchase_order_number: order.po.purchase_order_number || "",
      internal_po_number: order.po.internal_po_number || "",
      discrepancy: !order.po.quality_check,
    });

    setProducts(
      (order.products || []).map((product) => ({
        product_id: product.product_id,
        product_name: product.product_name || "",
        quantity: product.quantity || "",
        measurement: product.measurement || "",
      })),
    );

    setIsEdit(true);
  };
  const handleProductChange = (index, field, value) => {
    setProducts((prev) =>
      prev.map((product, i) =>
        i === index
          ? {
              ...product,
              [field]: value,
            }
          : product,
      ),
    );
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSaveChanges = async () => {
    console.log(poId);
    const updateData = {
      purchase_order_number: editData.purchase_order_number,

      internal_po_number: editData.internal_po_number,

      discrepancy: editData.discrepancy,

      products: products,
    };

    console.log("Submitting PO update:", updateData);

    const [success, result] = await updatePurchaseOrder(poId, updateData);

    if (!success) {
      console.error("Failed to update PO:", result);

      alert("Failed to update purchase order.");

      return;
    }

    console.log("Purchase order updated:", result);

    setIsEdit(false);

    setView("table");
  };
  if (!order || !order.po) {
    return <Loading message="Waiting for server to respond with data ...." />;
  }
  if (updateLoading) {
    return <Loading message="Updating purchase order..." />;
  }
  if (updateError) {
    return (
      <div className="PdfEdit__error">
        <h3>Unable to update purchase order</h3>
        <p>
          {updateError?.message ||
            "An error occurred while updating the purchase order."}
        </p>

        <div className="PdfEdit__Btn-container">
          <div
            onClick={() => setView("table")}
            className="PdfEdit__Btn PdfEdit__Btn-Back"
          >
            ← Back to Purchase Orders
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="PdfEdit__container">
      <div className="PdfEdit__action-bar">
        <h3>Purchase Order</h3>

        {!isEdit ? (
          <div className="PdfEdit__icon-container">
            <FaPrint
              className="print-icon"
              title="Print"
              onClick={handlePrint}
            />
            <FaEdit
              className="edit-icon"
              title="Edit Purchase Order"
              onClick={handleEdit}
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
              onClick={handleSaveChanges}
            >
              Save Changes
            </div>
          </div>
        )}
      </div>
      <div className="PdfEdit__outer-container">
        <div className="PdfEdit__page-container">
          <div ref={pageRef} className="PdfEdit__document">
            <div className="PdfEdit__header">
              <img
                src="/MG_Logo.png"
                alt="Company Logo"
                className="PdfEdit__img"
              />

              <div className="PdfEdit__page-heading">
                <span>4476 MO-5 & 240</span>
                <span>Glasgow, MO 65254</span>
                <span>+1 (660) 338-2243</span>
              </div>
            </div>

            <div className="PdfEdit__data-return">
              <p className="PdfEdit__company-name">
                <strong>Company Name:</strong>
                <span>{order.po.company_name || ""}</span>
              </p>

              <p className="PdfEdit__purchase-order-no">
                <strong>Purchase Order Number:</strong>

                {isEdit ? (
                  <input
                    type="text"
                    name="purchase_order_number"
                    value={editData.purchase_order_number}
                    onChange={handleFieldChange}
                  />
                ) : (
                  <span>{order.po.purchase_order_number || ""}</span>
                )}
              </p>
              <p className="PdfEdit__purchase-order-no">
                <strong>Internal PO Number:</strong>

                {isEdit ? (
                  <input
                    type="text"
                    name="internal_po_number"
                    value={editData.internal_po_number}
                    onChange={handleFieldChange}
                    placeholder="Enter our PO number"
                  />
                ) : (
                  <span>{order.po.internal_po_number || "Not assigned"}</span>
                )}
              </p>

              <p className="PdfEdit__created-at">
                <strong>Date:</strong>
                <span>{dateFormatter(order.po.created_at) || ""}</span>
              </p>
              <div className="PdfEdit__product-containers">
                {(isEdit ? products : order.products).map((product, index) => (
                  <div className="PdfEdit__product" key={product.product_id}>
                    <p>
                      <strong>Product</strong>
                      <br />#{index + 1}
                    </p>

                    <p>
                      <strong>Product Name</strong>
                      <br />

                      {isEdit ? (
                        <input
                          type="text"
                          value={product.product_name}
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "product_name",
                              e.target.value,
                            )
                          }
                        />
                      ) : (
                        product.product_name
                      )}
                    </p>

                    <p>
                      <strong>Quantity</strong>
                      <br />

                      {isEdit ? (
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "quantity",
                              e.target.value,
                            )
                          }
                        />
                      ) : (
                        product.quantity
                      )}
                    </p>

                    <p>
                      <strong>Measurement</strong>
                      <br />

                      {isEdit ? (
                        <input
                          type="text"
                          value={product.measurement}
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "measurement",
                              e.target.value,
                            )
                          }
                        />
                      ) : (
                        product.measurement
                      )}
                    </p>
                  </div>
                ))}
              </div>
              {isEdit ? (
                <div className="PdfEdit__discrepancy-field">
                  <label>
                    <input
                      type="checkbox"
                      checked={editData.discrepancy}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          discrepancy: e.target.checked,
                        }))
                      }
                    />
                    Purchase Order is in Discrepancy
                  </label>
                </div>
              ) : editData.discrepancy ? (
                <h1 className="PdfEdit__Discrepancy">
                  🚫 This Purchase Order is in Discrepancy
                </h1>
              ) : (
                <h1 className="PdfEdit__Approved">
                  ✅ This Purchase Order is Approved
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="PdfEdit__Btn-container">
        <div
          onClick={() => setView("table")}
          className="PdfEdit__Btn PdfEdit__Btn-Back"
        >
          ← Back to Purchase Orders
        </div>
      </div>
    </div>
  );
};

export default PdfEdit;
