import { useState } from "react";
import "./NewListView.css";
import { FaRegFilePdf } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";
import { GrPrevious, GrNext } from "react-icons/gr";

import { useGetPurchaseOrdersService } from "../../utility/api_services/purchaseOrdersService";

import { dateFormatter } from "../../utility/dateFormatter";

const ListView = ({ setView, setPoId }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { purchaseOrders, pagination, loading, error } =
    useGetPurchaseOrdersService({
      page,
      limit,
      search,
    });

  const safeOrders = Array.isArray(purchaseOrders) ? purchaseOrders : [];

  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);
    setSearch(searchInput.trim());
  };

  const handlePrevious = () => {
    if (pagination?.hasPreviousPage && !loading) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  const handleNext = () => {
    if (pagination?.hasNextPage && !loading) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  const onClickHandler = (poId, view) => {
    setPoId(poId);
    setView(view);
  };

  return (
    <div className="listView">
      {/* Search */}
      <div className="listView__search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search purchase orders..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>
      </div>

      {/* Error */}
      {error && <div className="listView__error">{error}</div>}

      {/* Purchase Order Table */}
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
          {/* Loading */}
          {loading ? (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          ) : safeOrders.length === 0 ? (
            /* No Results */
            <tr>
              <td colSpan={5}>No purchase orders found.</td>
            </tr>
          ) : (
            /* Results */
            safeOrders.map((item, index) => (
              <tr key={item.po_id}>
                {/* Entry Number */}
                <td>{(page - 1) * limit + index + 1}</td>

                {/* PO Number */}
                <td>{item.purchase_order_number}</td>

                {/* Company */}
                <td>{item.company_name}</td>

                {/* Date */}
                <td>{dateFormatter(item.created_at)}</td>

                {/* Actions */}
                <td className="edit-icon">
                  {/* Edit PDF */}
                  <div
                    className="listView__pdfIcon"
                    onClick={() => onClickHandler(item.po_id, "pdf-edit")}
                  >
                    <FaRegFilePdf />
                  </div>

                  {/* Upload Image */}
                  <div
                    className="listView__addImgIcon"
                    onClick={() =>
                      onClickHandler(
                        {
                          poId: item.po_id,
                          purchase_order_number: item.purchase_order_number,
                        },
                        "img-upload",
                      )
                    }
                  >
                    <LuImagePlus />
                  </div>

                  {/* View Images */}
                  <div
                    className="listView__imgIcon"
                    onClick={() =>
                      onClickHandler(
                        {
                          poId: item.po_id,
                          purchase_order_number: item.purchase_order_number,
                        },
                        "show-img",
                      )
                    }
                  >
                    <IoImageOutline />
                  </div>
                </td>
              </tr>
            ))
          )}

          {/* Pagination */}
          <tr className="buttons-table-row">
            <td colSpan={5}>
              <div className="listView__pagination">
                {/* Previous */}
                <button
                  type="button"
                  className="prev"
                  disabled={!pagination?.hasPreviousPage || loading}
                  onClick={handlePrevious}
                >
                  <GrPrevious />
                </button>

                {/* Page Information */}
                <span>
                  Page {pagination?.page || page} of{" "}
                  {pagination?.totalPages || 1}
                </span>

                {/* Next */}
                <button
                  type="button"
                  className="next"
                  disabled={!pagination?.hasNextPage || loading}
                  onClick={handleNext}
                >
                  <GrNext />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
