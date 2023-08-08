import { Router } from "express";
import { deleteQuizById } from "../../controllers/quizControllers";

const router = Router();

router.delete("/:id", deleteQuizById);

export { router as deleteQuizByIdRouter };
