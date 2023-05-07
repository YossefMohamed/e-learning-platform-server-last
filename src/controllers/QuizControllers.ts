import { NextFunction, Request, Response } from "express";
import { IQuestion, IQuiz, Question, Quiz } from "../models/QuizModel";
import { NotFoundError } from "../errors/not-found-error";

// Create a new question
export const createQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, options } = req.body;

    // Create new question document in database
    const newQuestion: IQuestion = new Question({
      text,
      options: options.map((o: any) => ({
        value: o.value,
        selected: o.selected,
      })),
    });

    // Save new question document to database
    const createdQuestion = await newQuestion.save();

    // Add new question to quiz document
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new NotFoundError();
    }
    quiz.questions.push(createdQuestion);
    await quiz.save();

    res.status(201).json(createdQuestion);
  } catch (error) {
    next(error);
  }
};
