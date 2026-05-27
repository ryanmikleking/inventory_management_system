import Header from "../components/header/Header";
import Submit from "../components/submit/Submit";

const SubmitLayout = () => {
  return (
    <div className="main-container">
      <div className="stick-header">
        <Header />
      </div>
      <div className="content-container">
        <Submit />
      </div>
    </div>
  );
};

export default SubmitLayout;
