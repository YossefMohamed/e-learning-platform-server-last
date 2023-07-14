import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found-error";
import Lesson from "../models/lessonModel";
import fs from "fs";
import { Quiz } from "../models/QuizModel";
import User from "../models/userModel";
import Chat from "../models/chatSchema";
import Message from "../models/messageSchema";

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
    await Quiz.create({
      lesson: lesson._id,
    });
    await lesson.populate("course");
    const students = await User.find({
      course: course,
    });

    students.map(async ({ _id }: { _id: string }) => {
      const users = [_id];

      users.push(req.user._id);

      let chat = await Chat.findOne({
        users: { $in: users },
      }).populate([
        {
          path: "users",
        },
        {
          path: "latestMessage",
          select: "content readBy",
        },
      ]);

      const message = await Message.create({
        sender: req.user?._id,
        content: "New lesson has been added to " + lesson.course.name,
        chat,
        readBy: [req.user?._id],
      });
      await Chat.findByIdAndUpdate(chat, {
        latestMessage: message,
      });
    });

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

    const lesson = await Lesson.findById(id).populate("course");
    return res.status(200).json({
      status: "ok",
      data: lesson,
    });
  } catch (error) {
    next(new NotFoundError());
  }
};

export const getLessonsWithUnitsByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { course } = req.params;
    console.log(course);
    const lessons = await Lesson.find({
      course,
    }).populate("unit");
    let lessonsWithUnits = [];
    lessons.map((lesson) => {
      if (
        lessonsWithUnits
          .map(({ _id }) => _id === lesson.unit._id)
          .includes(true)
      ) {
        return;
      }
      lessonsWithUnits.push({
        _id: lesson.unit._id,
        name: lesson.unit.name,
        lessons: [],
      });
    });

    lessonsWithUnits.map((unit, idx) => {
      lessons.map((lesson) => {
        if (lesson.unit._id === unit._id) {
          lessonsWithUnits[idx] = {
            ...lessonsWithUnits[idx],
            lessons: [...lessonsWithUnits[idx].lessons, lesson],
          };
        }
      });
    });

    return res.status(200).json({
      status: "ok",
      data: lessonsWithUnits,
    });
  } catch (error) {
    next(error);
  }
};
