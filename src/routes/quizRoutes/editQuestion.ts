import { Router } from "express";
import { editQuestion } from "../../controllers/QuizControllers";
import { validateRequest } from "../../middlewares/validate-request";
import { editQuestionValidators } from "../../services/quizValidators/editQuestionValidators";

const router = Router();

router.patch(
  "/questions/:questionId",

  editQuestionValidators,
  validateRequest,
  editQuestion
);

export { router as editQuestionRouter };
