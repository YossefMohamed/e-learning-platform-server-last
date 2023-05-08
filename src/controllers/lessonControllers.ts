import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found-error";
import Lesson from "../models/lessonModel";
import fs from "fs";
import { Quiz } from "../models/QuizModel";
interface MulterRequest extends Request {
  files: any;
}

export const getLessonByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { course } = req.params;
    const lessons = await Lesson.find({
      course,
    }).populate("unit");

    return res.status(200).json({
      status: "ok",
      data: lessons,
    });
  } catch (error) {
    next(new NotFoundError("Lessons is not found"));
  }
};

export const createLesson = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { unit, course } = req.params;
    const { name, description, extra } = req.body;
    if (!req.files.video || !req.files.file || !req.files.assignment)
      throw new Error("Please upload a least one resource");

    if (!name) throw new Error("Please enter a valid name");

    const lesson = await Lesson.create({
      name,
      video: req.files.video[0].filename,
      file: req.files.file && req.files.file[0].filename,
      description,
      assignment: req.files.assignment && req.files.assignment[0].filename,
      extra,
      unit,
      course,
    });
    const quiz = await Quiz.create({
      lesson: lesson._id,
    });
    console.log(quiz);
    res.status(200).json({
      status: "ok",
      data: lesson,
    });
  } catch (error) {
    console.log(error.message);
    for (const key in req.files) {
      fs.unlink(req.files[key][0].path, (err) => {
        if (err) {
          return next(err);
        }
        console.log(req.files[key][0].path + " was deleted");
      });
    }

    next(error);
  }
};

export const getLessonByUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { unit } = req.body;
    const lessons = await Lesson.find({
      unit,
    }).populate("unit");

    return res.status(200).json({
      status: "ok",
      data: lessons,
    });
  } catch (error) {
    next(new NotFoundError("Lessons is not found"));
  }
};

export const getLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id);

    const lesson = await Lesson.findById(id);
    console.log(lesson);
    return res.status(200).json({
      status: "ok",
      data: lesson,
    });
  } catch (error) {
    next(new NotFoundError());
  }
};
