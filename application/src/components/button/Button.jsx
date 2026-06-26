import "./Button.css";

const Button = ({ btnName, actionEvent }) => {
  return (
    <div className="btn" onClick={actionEvent}>
      {btnName}
      {/* {!btnType ? (
        <div className="btn" onClick={actionEvent}>
          {btnName}
        </div>
      ) : (
        <div className="btn" onClick={actionEvent}>
          {btnName}
        </div>
      )} */}
    </div>
  );
};

export default Button;
