import { NextFunction, Request, Response } from "express";
import Course from "../models/courseModel";
import Year from "../models/yearModel";
import { NotFoundError } from "../errors/not-found-error";

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // if (!req.user.isAdmin) throw new Error();

    const { name, year } = req.body;

    let course = await Course.create({
      name,
      year,
    });
    return res.status(200).json({
      status: "ok",
      data: course,
    });
  } catch (error) {
    next(new NotFoundError(error.message));
  }
};

export const editCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user.isAdmin) throw new Error();
    const { id } = req.params;
    const { name, year } = req.body;
    const course = await Course.findById(id);
    course.name = name || course.name;
    course.year = year || course.year;
    await course.save();
    return res.status(200).json({
      status: "ok",
      data: course,
    });
  } catch (error) {
    next(new NotFoundError("Year is not found"));
  }
};

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await Course.find().populate("year");

    return res.status(200).json({
      status: "ok",
      data: courses,
    });
  } catch (error) {
    next(new NotFoundError("Server is not found"));
  }
};

export const getCoursesByYear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { year } = req.params;
    const courses = await Course.find({
      year: year,
    }).populate("year");

    return res.status(200).json({
      status: "ok",
      data: courses,
    });
  } catch (error) {
    next(new NotFoundError("Server is not found"));
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // if (!req.user.isAdmin) throw new Error();
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    return res.status(200).json({
      status: "ok",
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { course } = req.user;
    let currentCourse: any;
    if (req.user.isAdmin) {
      currentCourse = await Course.find();
    } else {
      currentCourse = await Course.find({ _id: course });
    }
    if (currentCourse) {
      throw new NotFoundError("Course is not found");
    }
    return res.status(200).json({
      status: "ok",
      data: currentCourse,
    });
  } catch (error) {
    next(error);
  }
};
