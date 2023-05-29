import { Router } from "express";
import { getUserSubmitByLesson } from "../../controllers/submitControllers";
import { getSubmitValidators } from "../../services/submitsValidators/getSubmitValidators";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.get(
  "/users/:lesson",

  getSubmitValidators,

  validateRequest,

  getUserSubmitByLesson
);

export { router as getUserSubmitByLessonRouter };
