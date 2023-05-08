import { Router } from "express";
import { getQuestionById } from "../../controllers/QuizControllers";

const router = Router();

router.get("/:id", getQuestionById);

export { router as getQuestionByIdRouter };
