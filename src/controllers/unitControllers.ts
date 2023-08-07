import { NextFunction, Request, Response } from "express";
import Course from "../models/courseModel";
import { NotFoundError } from "../errors/not-found-error";
import Unit from "../models/unitModel";
import Lesson from "../models/lessonModel";

export const createUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user.isAdmin) throw new Error();

    const { name, course } = req.body;

    let unit = await Unit.create({
      name,
      course,
    });
    return res.status(200).json({
      status: "ok",
      data: unit,
    });
  } catch (error) {
    next(new NotFoundError(error.message));
  }
};

export const editUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user.isAdmin) throw new Error();
    const { id } = req.params;
    const { name } = req.body;
    const unit = await Unit.findById(id);
    unit.name = name || unit.name;
    await unit.save();
    return res.status(200).json({
      status: "ok",
      data: unit,
    });
  } catch (error) {
    next(new NotFoundError("Year is not found"));
  }
};

export const getUnits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const units = await Unit.find().populate("course");
    await Unit.deleteMany();
    await Lesson.deleteMany();
    return res.status(200).json({
      status: "ok",
      data: units,
    });
  } catch (error) {
    next(new NotFoundError("Server is not found"));
  }
};

export const getUnitsByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { course } = req.params;
    const unit = await Unit.find({
      course,
    }).populate("course");

    return res.status(200).json({
      status: "ok",
      data: unit,
    });
  } catch (error) {
    next(new NotFoundError("Server is not found"));
  }
};

export const deleteUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user.isAdmin) throw new Error();
    const { id } = req.params;
    await Unit.findByIdAndDelete(id);
    await Lesson.deleteMany({
      unit: id,
    });
    return res.status(200).json({
      status: "ok",
    });
  } catch (error) {
    next(error);
  }
};
