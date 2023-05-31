import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found-error";
import fs from "fs";
import Submit, { ISubmit } from "../models/submitModel";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import Lesson from "../models/lessonModel";

interface MulterRequest extends Request {
  files: any;
}

export const createSubmit = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lesson } = req.params;
    if (!req.files.file) throw new Error("Please upload the homework");
    if (await Submit.findOne({ lesson, user: req.user._id }))
      throw new Error("Submit already exists");
    const submit = await Submit.create({
      lesson,
      user: req.user._id,
      file: req.files.file && req.files.file[0].filename,
    });

    res.status(200).json({
      status: "ok",
      data: submit,
    });
  } catch (error) {
    for (const key in req.files) {
      fs.unlink(req.files[key][0].path, (err) => {
        if (err) {
          return next(err);
        }
      });
    }

    next(error);
  }
};

export const getSubmitsByLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lesson } = req.params;
    let submit: ISubmit[];
    if (req.user.isAdmin) {
      submit = await Submit.find({ lesson }).populate("user lesson");
    } else {
      submit = await Submit.find({ lesson, user: req.user._id }).populate(
        "user lesson"
      );
    }
    res.status(200).json({
      status: "ok",
      data: submit,
    });
  } catch (error) {
    next(error);
  }
};

export const ReviewSubmit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user.isAdmin)
      throw new NotAuthorizedError("You are not authorized");
    const { id } = req.params;
    const { mark, refMark } = req.body;
    const submit: ISubmit = await Submit.findById(id);
    if (!submit) throw new NotFoundError("Submit is not found");
    submit.reviewed = true;
    submit.mark = mark;
    submit.refMark = refMark;
    res.status(200).json({
      status: "ok",
      data: submit,
    });
  } catch (error) {
    next(error);
  }
};
