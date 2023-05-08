import { Router } from "express";
import { createQuestionRouter } from "./createQuestion";
import { getQuestionByIdRouter } from "./getQuestionById";
import { getQuizByLessonRouter } from "./getQuizByLesson";

const QuizRouter = Router();

QuizRouter.use(createQuestionRouter);
QuizRouter.use(getQuestionByIdRouter);
QuizRouter.use(getQuizByLessonRouter);

export { QuizRouter };
