import { Router } from "express";
import { createQuestion } from "../../controllers/QuizControllers";
import { validateRequest } from "../../middlewares/validate-request";
import { createQuestionValidators } from "../../services/quizValidators/createQuestionValidators";

const router = Router();

router.post(
  "/questions/:quizId",

  createQuestionValidators,
  validateRequest,
  createQuestion
);

export { router as createQuestionRouter };
