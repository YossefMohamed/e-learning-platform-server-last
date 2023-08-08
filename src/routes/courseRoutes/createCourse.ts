import { Router } from "express";
import { createCourse } from "../../controllers/courseControllers";
import { validateRequest } from "../../middlewares/validate-request";
import { createCourseValidators } from "../../services/courseValidators/createCourseValidators";
import upload from "../../middlewares/upload";

const router = Router();

router.post(
  "/",

  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createCourseValidators,
  validateRequest,
  createCourse
);

export { router as createCourseRouter };
