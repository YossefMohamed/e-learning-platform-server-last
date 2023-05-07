import { Router } from "express";
import { createQuestionRouter } from "./createQuestion";

const QuizRouter = Router();

QuizRouter.use(createQuestionRouter);

export { QuizRouter };
