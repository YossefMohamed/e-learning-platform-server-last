import { Router } from "express";
import { createLessonRouter } from "./createLesson";
import { getLessonByCourseRouter } from "./getLessonsByCourse";
import { getLessonRouter } from "./getLesson";

const lessonRouter = Router();

lessonRouter.use(createLessonRouter);
lessonRouter.use(getLessonByCourseRouter);
lessonRouter.use(getLessonRouter);

export { lessonRouter };
