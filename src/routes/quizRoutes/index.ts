import { Router } from "express";
import { createQuestionRouter } from "./createQuestion";
import { getQuestionByIdRouter } from "./getQuestionById";
import { getQuizByLessonRouter } from "./getQuizByLesson";
import { createQuizRouter } from "./createQuiz";
import { getQuizByIdRouter } from "./getQuizById";

const QuizRouter = Router();

QuizRouter.use(createQuestionRouter);
QuizRouter.use(getQuestionByIdRouter);
QuizRouter.use(getQuizByLessonRouter);
QuizRouter.use(createQuizRouter);
QuizRouter.use(getQuizByIdRouter);

export { QuizRouter };
