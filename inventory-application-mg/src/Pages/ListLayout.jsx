//import React from "react";
import Header from "../components/header/Header";
import ListView from "../components/list_view/ListView";
const ListLayout = () => {
  return (
    <div className="main-container">
      <div className="sticky-container">
        <Header />
      </div>
      <div className="content-container">
        <ListView />
      </div>
    </div>
  );
};

export default ListLayout;
