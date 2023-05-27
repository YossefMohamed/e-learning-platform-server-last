import { Router } from "express";
import { getSubmitsByLesson } from "../../controllers/submitControllers";

const router = Router();

router.get(
  "/:lesson",

  getSubmitsByLesson
);

export { router as getSubmitsByLessonRouter };
