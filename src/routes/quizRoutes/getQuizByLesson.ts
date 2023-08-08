import { Router } from "express";
import { getQuizByLesson } from "../../controllers/quizControllers";

const router = Router();

router.get("/lesson/:lesson", getQuizByLesson);

export { router as getQuizByLessonRouter };
