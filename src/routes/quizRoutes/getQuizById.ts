import { Router } from "express";
import { getQuizById } from "../../controllers/QuizControllers";

const router = Router();

router.get("/:id", getQuizById);

export { router as getQuizByIdRouter };
