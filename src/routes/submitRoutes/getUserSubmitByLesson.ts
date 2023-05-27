import { Router } from "express";
import { getUserSubmitByLesson } from "../../controllers/submitControllers";

const router = Router();

router.get("/users/:lesson", getUserSubmitByLesson);

export { router as getUserSubmitByLessonRouter };
