import { Router } from "express";
import { deleteCourse, editCourse } from "../../controllers/courseControllers";

const router = Router();

router.delete("/:id", deleteCourse);

export { router as deleteCourseRouter };
