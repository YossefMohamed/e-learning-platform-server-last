import { Router } from "express";
import { createLesson } from "../../controllers/lessonControllers";
import upload from "../../middlewares/upload";

const router = Router();

router.post(
  "/:course/:unit",

  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
    {
      name: "assignment",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  createLesson
);

export { router as createLessonRouter };
