import { Router } from "express";
import { createQuestionRouter } from "./createQuestion";
import { getQuestionByIdRouter } from "./getQuestionById";
import { getQuizByLessonRouter } from "./getQuizByLesson";
import { createQuizRouter } from "./createQuiz";

const QuizRouter = Router();

QuizRouter.use(createQuestionRouter);
QuizRouter.use(getQuestionByIdRouter);
QuizRouter.use(getQuizByLessonRouter);
QuizRouter.use(createQuizRouter);

export { QuizRouter };
