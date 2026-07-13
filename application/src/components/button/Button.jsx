import "./Button.css";

const Button = ({ btnName, actionEvent }) => {
  return (
    <div className="btn" onClick={actionEvent}>
      {btnName}
    </div>
  );
};

export default Button;
