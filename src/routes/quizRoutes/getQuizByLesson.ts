import { Router } from "express";
import { getQuizByLesson } from "../../controllers/QuizControllers";

const router = Router();

router.get("/lesson/:lesson", getQuizByLesson);

export { router as getQuizByLessonRouter };
