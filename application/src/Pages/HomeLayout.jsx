import Header from "../components/header/Header";
import Home from "../components/home_body/Home";
import DeviceSmall from "../components/device_xsmall/DeviceSmall";
import "../App.css";

const HomeLayout = () => {
  return (
    <div className="main-container">
      <div className="sticky-header">
        <Header />
      </div>
      <div className="content-container">
        <Home />
      </div>
      <DeviceSmall />
    </div>
  );
};

export default HomeLayout;
