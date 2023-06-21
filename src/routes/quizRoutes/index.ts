import { Router } from "express";
import { createQuestionRouter } from "./createQuestion";
import { getQuestionByIdRouter } from "./getQuestionById";
import { getQuizByLessonRouter } from "./getQuizByLesson";
import { createQuizRouter } from "./createQuiz";
import { getQuizByIdRouter } from "./getQuizById";
import { editQuestionRouter } from "./editQuestion";
import { protect } from "../../middlewares/auth";
import { checkQuestionAnswerRouter } from "./checkQuestionAnswer";
import { addScoreRouter } from "./addUserScoreToQuiz";

const QuizRouter = Router();

QuizRouter.use(protect);
QuizRouter.use(createQuestionRouter);
QuizRouter.use(getQuestionByIdRouter);
QuizRouter.use(getQuizByLessonRouter);
QuizRouter.use(createQuizRouter);
QuizRouter.use(getQuizByIdRouter);
QuizRouter.use(editQuestionRouter);
QuizRouter.use(checkQuestionAnswerRouter);
QuizRouter.use(addScoreRouter);

export { QuizRouter };
