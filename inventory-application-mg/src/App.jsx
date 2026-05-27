import "./App.css";
import HomeLayout from "./Pages/HomeLayout";
import SubmitLayout from "./Pages/SubmitLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/SubmitNew" element={<SubmitLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
