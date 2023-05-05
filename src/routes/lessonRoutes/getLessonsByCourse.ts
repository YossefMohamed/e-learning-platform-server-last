import { Router } from "express";
import { getLessonByCourse } from "../../controllers/lessonControllers";

const router = Router();

router.get("/:course", getLessonByCourse);

export { router as getLessonByCourseRouter };
