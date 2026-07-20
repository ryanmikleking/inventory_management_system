import { useGetPurchaseOrderFiles } from "../../utility/api_services/purchaseOrdersService";
import "./ShowImages.css";

export const ShowImages = ({ setView, poId }) => {
  console.log(poId.poId);
  const files = useGetPurchaseOrderFiles(poId.poId);
  console.log(files);
  return (
    <div>
      <h1>Show Images</h1>
      {files?.files?.map((file) => (
        <img
          key={file.file_name}
          className="minio-images"
          src={file.signedUrl}
          alt={file.fileName}
          onLoad={() => console.log("Loaded:", file.file_name)}
          onError={(e) => {
            console.log("Failed:", file.fileName);
            console.log(e.currentTarget.src);
          }}
        />
      ))}
      <button onClick={() => setView("table")}>Go Back</button>
    </div>
  );
};

export default ShowImages;
