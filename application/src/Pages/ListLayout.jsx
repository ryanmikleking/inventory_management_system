//import React from "react";
import { useState } from "react";
import Header from "../components/header/Header";
import ListView from "../components/list_view/NewListView";
import ImageUpload from "../components/image_upload/ImageUpload";
import { PdfEdit } from "../components/pdf-edit/PdfEdit";
import { ShowImages } from "../components/show_po_images/ShowImages";
import DeviceSmall from "../components/device_xsmall/DeviceSmall";

const ListLayout = () => {
  const [view, setView] = useState("table");
  const [poId, setPoId] = useState({
    poId: "",
    purchase_order_number: "",
  });

  const viewChange = () => {
    switch (view) {
      case "img-upload":
        return <ImageUpload setView={setView} poId={poId} setPoId={setPoId} />;
      case "pdf-edit":
        return <PdfEdit setView={setView} poId={poId} />;
      case "table":
        return <ListView setView={setView} setPoId={setPoId} />;
      case "show-img":
        return <ShowImages setView={setView} poId={poId} />;
      default:
        return <ListView setView={setView} setPoId={setPoId} />;
    }
  };

  return (
    <div className="main-container">
      <div className="sticky-container">
        <Header />
      </div>
      <div className="content-container">{viewChange()}</div>
      <DeviceSmall />
    </div>
  );
};

export default ListLayout;
