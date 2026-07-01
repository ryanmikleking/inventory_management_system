import "./Loading.css";

export const Loading = ({ message }) => {
  return (
    <div className="loading">
      <div className="loading__spinner"></div>
      <h2 className="loading__title">Loading Purchase Order</h2>
      <p className="loading__text">{message}</p>
    </div>
  );
};
