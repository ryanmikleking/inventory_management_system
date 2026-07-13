import { updateImagesService } from "../services/updateImagesService.js";
import { AppError } from "../middleware/errors/AppError.js";
import { attachmentRepository } from "../services/attachmentRepository.js";

export const uploadPOImage = async (req, res) => {
  try {
    const { poId, purchase_order_number } = req.body;
    const files = req.files;

    const filePath = await updateImagesService(
      poId,
      purchase_order_number,
      files,
    );

    res.json({
      success: true,
      filePath,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    }
  }
};
export const uploadTestImage = async (req, res) => {
  try {
    const response = await attachmentRepository(req.body);
    console.log(req.body);
    res.json({
      success: true,
      response,
    });
  } catch (error) {}
};
