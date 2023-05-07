import { Router } from "express";
import { createQuestion } from "../../controllers/QuizControllers";
import { createQuestionValidators } from "../../services/quizValidators/createQuizValidators";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.post(
  "/questions/:quizId",
  createQuestionValidators,
  validateRequest,
  createQuestion
);

export { router as createQuestionRouter };
