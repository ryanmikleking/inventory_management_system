import "./Label.css";

const Label = ({ isFor, name }) => {
  return (
    <label className="label" htmlFor={isFor}>
      {name}
    </label>
  );
};

export default Label;
