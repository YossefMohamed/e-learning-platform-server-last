import { Router } from "express";
import { ReviewSubmit } from "../../controllers/submitControllers";
import { validateRequest } from "../../middlewares/validate-request";
import { reviewSubmitValidators } from "../../services/submitsValidators/reviewSubmitValidators";

const router = Router();

router.patch(
  "/reviews/:id",
  reviewSubmitValidators,
  validateRequest,
  ReviewSubmit
);

export { router as ReviewSubmitRouter };
