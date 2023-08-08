import { Router } from "express";
import { getQuizById } from "../../controllers/quizControllers";

const router = Router();

router.get("/:id", getQuizById);

export { router as getQuizByIdRouter };
