import { uploadImage } from "../services/imageService.js";
import { AppError } from "../middleware/errors/AppError.js";

export const uploadPOImage = async (req, res) => {
  try {
    const { poId } = req.body;
    const file = req.file;

    const filePath = await uploadImage(file, poId);

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
