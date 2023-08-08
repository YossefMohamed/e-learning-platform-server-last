import { Router } from "express";
import { createQuiz } from "../../controllers/quizControllers";
import { validateRequest } from "../../middlewares/validate-request";
import { createQuizValidators } from "../../services/quizValidators/createQuizValidators";

const router = Router();

router.post("/:lesson", createQuizValidators, validateRequest, createQuiz);

export { router as createQuizRouter };
