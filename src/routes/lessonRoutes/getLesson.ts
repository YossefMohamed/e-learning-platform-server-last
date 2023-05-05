import { Router } from "express";
import { getLesson } from "../../controllers/lessonControllers";

const router = Router();

router.get("/lesson/:id", getLesson);

export { router as getLessonRouter };
