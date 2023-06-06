import { Router } from "express";
import { checkQuestionAnswer } from "../../controllers/QuizControllers";
import { validateRequest } from "../../middlewares/validate-request";
import { checkQuestionAnswerValidators } from "../../services/quizValidators/checkQuestionAnswerValidators";

const router = Router();

router.post(
  "/questions/check/:questionId",
  checkQuestionAnswerValidators,
  validateRequest,
  checkQuestionAnswer
);

export { router as checkQuestionAnswerRouter };
