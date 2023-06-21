import { Router } from "express";
import { addUserScore } from "../../controllers/QuizControllers";
import { validateRequest } from "../../middlewares/validate-request";
import { addScoreValidators } from "../../services/quizValidators/addScoreValidators";

const router = Router();

router.post(
  "/score/:quizId",
  addScoreValidators,
  validateRequest,
  addUserScore
);

export { router as addScoreRouter };
