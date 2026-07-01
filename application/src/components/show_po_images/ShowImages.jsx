export const ShowImages = ({ setView }) => {
  return (
    <div>
      <h1>Show Images</h1>
      <button onClick={() => setView("table")}>Go Back</button>
    </div>
  );
};

export default ShowImages;
