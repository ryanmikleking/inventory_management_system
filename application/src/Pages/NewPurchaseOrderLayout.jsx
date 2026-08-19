import DeviceSmall from "../components/device_xsmall/DeviceSmall";
import Header from "../components/header/Header";
//import Submit from "../components/submit/Submit";
import Form from "../components/user_input/Form";

const NewPurchaseOrderLayout = () => {
  return (
    <div className="main-container">
      <div className="stick-header">
        <Header />
      </div>
      <div className="content-container">
        {/* <Submit /> */}
        <Form />
      </div>
      <DeviceSmall />
    </div>
  );
};

export default NewPurchaseOrderLayout;
