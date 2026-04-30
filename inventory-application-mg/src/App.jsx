import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home_body/Home";
import Submit from "./components/submit/Submit";
import ListView from "./components/list_view/ListView";

import { useState } from "react";

const App = () => {
  const [view, setView] = useState("submit");
  const renderView = () => {
    switch (view) {
      case "list":
        return <ListView />;
      case "submit":
        return <Submit setView={setView} />;
      default:
        return <Home setView={setView} />;
    }
  };
  return (
    <div className="app-container">
      <div className="sticky-header">
        <Header setView={setView} />
      </div>
      <div className="content-container">{renderView()}</div>
    </div>
  );
};

export default App;
