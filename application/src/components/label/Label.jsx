import "./Label.css";

const Label = ({ isFor, name }) => {
  return <label htmlFor={isFor}>{name}</label>;
};

export default Label;
