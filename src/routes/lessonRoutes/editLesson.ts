import { Router } from "express";
import { editLesson } from "../../controllers/lessonControllers";

const router = Router();

router.patch("/:lessonId", editLesson);

export { router as editLessonRouter };
