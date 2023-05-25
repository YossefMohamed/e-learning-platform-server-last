import { Router } from "express";
import { createLessonRouter } from "./createLesson";
import { getLessonByCourseRouter } from "./getLessonsByCourse";
import { getLessonRouter } from "./getLesson";
import { getLessonsWithUnitsByCourseRouter } from "./getLessonsWithUnitsByCourse";

const lessonRouter = Router();

lessonRouter.use(createLessonRouter);
lessonRouter.use(getLessonByCourseRouter);
lessonRouter.use(getLessonRouter);
lessonRouter.use(getLessonsWithUnitsByCourseRouter);

export { lessonRouter };
