import { Router } from "express";
import { ReviewSubmit } from "../../controllers/submitControllers";
import { getSubmitValidators } from "../../services/submitsValidators/getSubmitValidators";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.get(
  "/reviews/:lesson",
  getSubmitValidators,
  validateRequest,
  ReviewSubmit
);

export { router as ReviewSubmitRouter };
