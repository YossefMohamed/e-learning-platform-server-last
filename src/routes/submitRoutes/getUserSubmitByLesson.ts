import { Router } from "express";
import { getUserSubmitByLesson } from "../../controllers/submitControllers";

const router = Router();

router.get("/:lesson/user", getUserSubmitByLesson);

export { router as getUserSubmitByLessonRouter };
