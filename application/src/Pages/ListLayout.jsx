//import React from "react";
import { useState } from "react";
import Header from "../components/header/Header";
import ListView from "../components/list_view/ListView";
import ItemPreview from "../components/item_preview/ItemPreview";

const ListLayout = () => {
  const [view, setView] = useState(false);
  const [keyValue, setKeyValue] = useState(0);

  const viewChange = () => {
    if (!view) setView(true);
    else setView(false);
  };

  return (
    <div className="main-container">
      <div className="sticky-container">
        <Header />
      </div>
      <div className="content-container">
        {view ? (
          <ItemPreview setView={viewChange} keyValue={keyValue} />
        ) : (
          <ListView setView={viewChange} setKeyValue={setKeyValue} />
        )}
      </div>
    </div>
  );
};

export default ListLayout;
