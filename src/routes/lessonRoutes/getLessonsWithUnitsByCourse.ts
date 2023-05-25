import { Router } from "express";
import { getLessonsWithUnitsByCourse } from "../../controllers/lessonControllers";

const router = Router();

router.get("/units/:course", getLessonsWithUnitsByCourse);

export { router as getLessonsWithUnitsByCourseRouter };
