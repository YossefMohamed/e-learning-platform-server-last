import { Router } from "express";
import { createCourseRouter } from "./createCourse";
import { getCoursesRouter } from "./getCourses";
import { editCourseRouter } from "./editCourse";
import { protect } from "../../middlewares/auth";
import { getCoursesByYearRouter } from "./getCoursesByYear";
import { deleteCourseRouter } from "./deleteCourse";
import { getCurrentUserCoursesRouter } from "./getCurrentUserCourse";

const courseRouter = Router();

courseRouter.use(protect);
courseRouter.use(getCoursesRouter);
courseRouter.use(getCurrentUserCoursesRouter);
courseRouter.use(getCoursesByYearRouter);

courseRouter.use(createCourseRouter);
courseRouter.use(deleteCourseRouter);

courseRouter.use(editCourseRouter);

export { courseRouter };
