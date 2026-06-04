import "./Button.css";

const Button = ({ btnName, funClick, btnType }) => {
  return (
    <div className="">
      {!btnType ? (
        <div className="btn hello" onSubmit={funClick}>
          {btnName}
        </div>
      ) : (
        <div className="btn" onClick={funClick}>
          {btnName}
        </div>
      )}
    </div>
  );
};

export default Button;
