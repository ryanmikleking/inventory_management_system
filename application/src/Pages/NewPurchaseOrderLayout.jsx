import Header from "../components/header/Header";
//import Submit from "../components/submit/Submit";
import Form from "../components/user_input/Form";

const SubmitLayout = () => {
  return (
    <div className="main-container">
      <div className="stick-header">
        <Header />
      </div>
      <div className="content-container">
        {/* <Submit /> */}
        <Form />
      </div>
    </div>
  );
};

export default SubmitLayout;
