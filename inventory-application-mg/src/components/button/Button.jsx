import "./Button.css";

const Button = ({ btnName, funClick }) => {
  return (
    <div className="btn" onClick={funClick}>
      {btnName}
    </div>
  );
};

export default Button;
