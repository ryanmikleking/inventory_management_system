import ImagePreview from "../image_preview/ImagePreview";
import Button from "../button/Button";
import { useImageUploader } from "../../utility/imagePreview";
import "./ImageUpload.css";
import { Loading } from "../loading/Loading";

import { useUpdatePurchaseOrdersService } from "../../utility/api_services/purchaseOrdersService";
export const ImageUpload = ({ setView, poId, setPoId }) => {
  const { images, handleImageChange, handleRemoveImage } = useImageUploader();
  const { updateLoading, updateImages } = useUpdatePurchaseOrdersService();

  const submitHandler = async () => {
    let count = 0;
    const formData = new FormData();
    images.forEach((img) => {
      formData.append(
        "files",
        new File(
          [img.blob],
          `${poId.purchase_order_number}-update-${count}.jpg`,
          {
            type: `image/jpg`,
            lastModified: Date.now(),
          },
        ),
      );
    });
    formData.append("poId", poId.poId);
    formData.append("purchase_order_number", poId.purchase_order_number);
    const result = await updateImages(formData);
    const userConfirmed = confirm("Submitted. Click Okay to continue...");
    if (userConfirmed) {
      if (result.status === 201 || result.status === 200) {
        console.log("Submitted");
        setPoId(null);
        setView("table");
      }
    }
  };
  if (updateLoading) return <Loading message={"Updating images ..."} />;
  return (
    <div className="ImageUpload__container">
      <ImagePreview
        images={images}
        handleImageChange={handleImageChange}
        handleRemoveImage={handleRemoveImage}
      />
      <div className="ImageUpload__btn-container">
        <Button btnName={"Submit"} actionEvent={submitHandler} />
        <Button btnName={"Cancel"} actionEvent={setView} />
      </div>
    </div>
  );
};

export default ImageUpload;
