import { Router } from "express";
import { editCourse } from "../../controllers/courseControllers";

const router = Router();

router.patch("/:id", editCourse);

export { router as editCourseRouter };
