import { Router } from "express";
import { getCourses } from "../../controllers/courseControllers";

const router = Router();

router.get("/", getCourses);

export { router as getCoursesRouter };
