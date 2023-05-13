import { Router } from "express";
import { checkQuestionAnswer } from "../../controllers/QuizControllers";
import { validateRequest } from "../../middlewares/validate-request";
import { checkQuestionAnswerValidators } from "../../services/quizValidators/checkQuestionAnswerValidators";

const router = Router();

router.post(
  "/questions/:questionId",
  checkQuestionAnswerValidators,
  validateRequest,
  checkQuestionAnswer
);

export { router as createQuestionRouter };
