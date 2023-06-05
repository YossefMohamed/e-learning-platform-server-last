import { Router } from "express";
import { getSubmitsByLesson } from "../../controllers/submitControllers";
import { getSubmitValidators } from "../../services/submitsValidators/getSubmitValidators";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.get(
  "/:lesson",

  getSubmitValidators,

  validateRequest,

  getSubmitsByLesson
);

export { router as getSubmitsByLessonRouter };
