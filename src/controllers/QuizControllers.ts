import { NextFunction, Request, Response } from "express";
import { IQuestion, IQuiz, Question, Quiz } from "../models/QuizModel";
import { NotFoundError } from "../errors/not-found-error";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import Score from "../models/scoreModal";

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

    quiz.questions.push(createdQuestion);
    await quiz.save();

    res.status(201).json({
      statue: "ok",
      data: createdQuestion,
    });
  } catch (error) {
    console.log(error.message);
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
    res.status(200).json({
      status: "ok",
      data: quiz,
    });
  } catch (error) {
    next(new NotFoundError());
  }
};

export const getQuizById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const score = await Score.findOne({
      quiz: id,
      student: req.user._id,
    });
    const quiz: any = await Quiz.findById(id).populate({
      path: "lesson",
      populate: {
        path: "course",
      },
    });
    if (!quiz) throw new NotFoundError();

    res.status(200).json({
      status: "ok",
      data: quiz,
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
    question.options = question.options.map((o) => {
      o.selected = false;
      return o;
    });
    res.status(200).json({
      status: "ok",
      data: question,
    });
  } catch (err) {
    next(new NotFoundError());
  }
};

export const checkQuestionAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { questionId } = req.params;

    const { index: answer } = req.body;
    const question = await Question.findById(questionId);

    if (!question || question.options.length - 1 < answer) {
      throw new NotFoundError();
    }
    const check = question.options[answer].selected;

    return res.status(200).json({
      status: "ok",
      data: {
        student: req.user._id,
        question: question._id,
        score: check,
      },
    });
  } catch (error) {
    next(new NotFoundError());
  }
};

export const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lesson } = req.params;

    const quiz = await Quiz.create({
      lesson,
    });
    res.status(200).json({
      status: "ok",
      data: quiz,
    });
  } catch (error) {
    next(new NotAuthorizedError());
  }
};

export const editQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, options } = req.body;
    const { questionId } = req.params;

    const question = await Question.findById(questionId);
    if (!question) throw new NotFoundError();
    question.text = text;
    question.options = options.map((o: any) => ({
      value: o.value,
      selected: o.selected,
    }));

    // Save new question document to database
    await question.save();

    // Add new question to quiz document

    res.status(200).json({
      statue: "ok",
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

export const addUserScore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { score } = req.body;
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) throw new NotFoundError();

    const userScore = await Score.create({
      student: req.user._id,
      quiz: quiz._id,
      score,
    });
    quiz.takenBy.push({ user: req.user._id, score: userScore.score });
    await quiz.save();
    res.status(200).json({
      statue: "ok",
      data: userScore,
    });
  } catch (error) {
    next(error);
  }
};
