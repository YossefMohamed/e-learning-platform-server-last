import { Router } from "express";
import { createCourse } from "../../controllers/courseControllers";
import { validateRequest } from "../../middlewares/validate-request";
import { createCourseValidators } from "../../services/courseValidators/createCourseValidators";

const router = Router();

router.post("/", createCourseValidators, validateRequest, createCourse);

export { router as createCourseRouter };
