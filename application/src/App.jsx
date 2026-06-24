import "./App.css";
import HomeLayout from "./Pages/HomeLayout";
import SubmitLayout from "./Pages/SubmitLayout";
import ListLayout from "./Pages/ListLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/SubmitNew" element={<SubmitLayout />} />
        <Route path="/List" element={<ListLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
