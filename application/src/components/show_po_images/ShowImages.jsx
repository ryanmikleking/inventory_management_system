import { useGetPurchaseOrderFiles } from "../../utility/api_services/purchaseOrdersService";
import { Loading } from "../loading/Loading";
import "./ShowImages.css";

export const ShowImages = ({ setView, poId }) => {
  console.log(poId.poId);
  const { files, fileLoading, error } = useGetPurchaseOrderFiles(poId.poId);
  if (fileLoading) {
    return <Loading message={"Loading files ..."} />;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="gallery">
      <div className="gallery-container">
        {files?.attachments?.map((file) => (
          <div key={file.attachmentId}>
            {file.file_type === "application/pdf" ? (
              <iframe
                src={`/api/file/streams/${file.attachment_id}`}
                width="100%"
                height="700"
                title={file.fileName}
              />
            ) : (
              <img
                src={`/api/file/streams/${file.attachment_id}`}
                width="100%"
                height={150}
                alt={file.fileName}
                className="purchase-order-image"
              />
            )}
          </div>
        ))}
      </div>

      {/* <button onClick={() => setView("table")}>Go Back</button> */}
      <div onClick={() => setView("table")} className="ShowImages__btn">
        Go Back
      </div>
    </div>
  );
};

export default ShowImages;
