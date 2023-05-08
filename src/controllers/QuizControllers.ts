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

    res.status(201).json({
      statue: "ok",
      data: createdQuestion,
    });
  } catch (error) {
    next(error);
  }
};

export const getQuizByLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lesson } = req.params;
    const quiz = await Quiz.find({
      lesson,
    });
    if (!quiz) throw new NotFoundError();
    res.status(200).json({
      status: "ok",
      data: lesson,
    });
  } catch (error) {
    next(new NotFoundError());
  }
};

export const getQuestionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionId = req.params.id as string;

    const question: IQuestion | null = await Question.findById(questionId);
    if (!question) {
      throw new NotFoundError();
    }
    res.status(200).json({
      status: "ok",
      data: question,
    });
  } catch (err) {
    next(new NotFoundError());
  }
};
