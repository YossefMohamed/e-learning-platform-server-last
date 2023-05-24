import { Router } from "express";
import { getCurrentUserCourses } from "../../controllers/courseControllers";

const router = Router();

router.get("/user", getCurrentUserCourses);

export { router as getCurrentUserCoursesRouter };
