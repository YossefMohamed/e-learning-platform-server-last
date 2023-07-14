import { Router } from "express";
import { createLessonRouter } from "./createLesson";
import { getLessonByCourseRouter } from "./getLessonsByCourse";
import { getLessonRouter } from "./getLesson";
import { getLessonsWithUnitsByCourseRouter } from "./getLessonsWithUnitsByCourse";
import { protect } from "../../middlewares/auth";

const lessonRouter = Router();

lessonRouter.use(getLessonByCourseRouter);
lessonRouter.use(getLessonRouter);
lessonRouter.use(getLessonsWithUnitsByCourseRouter);

lessonRouter.use(protect);

lessonRouter.use(createLessonRouter);

export { lessonRouter };
