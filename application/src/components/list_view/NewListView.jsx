import { useState } from "react";
import "./NewListView.css";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";
import { GrPrevious, GrNext } from "react-icons/gr";

import { useGetPurchaseOrdersService } from "../../utility/api_services/purchaseOrdersService";

import { dateFormatter } from "../../utility/dateFormatter";

const ListView = ({ setView, setPoId }) => {
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { purchaseOrders, pagination, loading, error } =
    useGetPurchaseOrdersService({
      page,
      limit,
      search,
      sort,
      order,
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
  const handleSort = (column) => {
    if (sort === column) {
      // Same column → toggle direction
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // New column → start ascending
      setSort(column);
      setOrder("asc");
    }

    setPage(1);
  };
  const getSortIcon = (column) => {
    if (sort !== column) {
      return <FaSort />;
    }

    return order === "asc" ? <FaSortUp /> : <FaSortDown />;
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

      {error && <div className="listView__error">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th
              onClick={() => handleSort("purchase_order_number")}
              className={`listView__sortable-header ${
                sort === "purchase_order_number"
                  ? "listView__sortable-header--active"
                  : ""
              }`}
            >
              <div className="listView__header-content">
                <span>Vendor PO</span>
                {getSortIcon("purchase_order_number")}
              </div>
            </th>
            <th
              onClick={() => handleSort("internal_po_number")}
              className={`listView__sortable-header ${
                sort === "internal_po_number"
                  ? "listView__sortable-header--active"
                  : ""
              }`}
            >
              <div className="listView__header-content">
                <span>Internal PO</span>
                {getSortIcon("internal_po_number")}
              </div>
            </th>
            <th
              onClick={() => handleSort("company_name")}
              className={`listView__sortable-header ${
                sort === "company_name"
                  ? "listView__sortable-header--active"
                  : ""
              }`}
            >
              <div className="listView__header-content">
                <span>Company</span>
                {getSortIcon("company_name")}
              </div>
            </th>
            <th
              onClick={() => handleSort("created_at")}
              className={`listView__sortable-header ${
                sort === "created_at" ? "listView__sortable-header--active" : ""
              }`}
            >
              <div className="listView__header-content">
                <span>Date</span>
                {getSortIcon("created_at")}
              </div>
            </th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          ) : safeOrders.length === 0 ? (
            <tr>
              <td colSpan={5}>No purchase orders found.</td>
            </tr>
          ) : (
            safeOrders.map((item, index) => (
              <tr key={item.po_id}>
                {/* Entry Number */}
                <td>{(page - 1) * limit + index + 1}</td>

                <td>{item.purchase_order_number}</td>
                <td>{item.internal_po_number || "—"}</td>
                <td>{item.company_name}</td>

                <td>{dateFormatter(item.created_at)}</td>

                <td className="edit-icon">
                  <div
                    className="listView__pdfIcon"
                    onClick={() => onClickHandler(item.po_id, "pdf-edit")}
                  >
                    <FaRegFilePdf />
                  </div>

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

          <tr className="buttons-table-row">
            <td colSpan={6}>
              <div className="listView__pagination">
                <button
                  type="button"
                  className="prev"
                  disabled={!pagination?.hasPreviousPage || loading}
                  onClick={handlePrevious}
                >
                  <GrPrevious />
                </button>

                <span>
                  Page {pagination?.page || page} of{" "}
                  {pagination?.totalPages || 1}
                </span>

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
