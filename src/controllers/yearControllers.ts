import mongoose from "mongoose";

import { NotFoundError } from "../errors/not-found-error";
import Year from "../models/yearModel";
import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const createYear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // if (!req.user.isAdmin) throw new Error();

    const { name } = req.body;

    const year = await Year.create({
      name: name,
    });

    return res.status(200).json({
      status: "ok",
      data: year,
    });
  } catch (error) {
    next(new NotFoundError("Year is not found"));
  }
};

export const editYear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // if (!req.user.isAdmin) throw new Error();
    const { id } = req.params;
    const { name } = req.body;
    console.log({ name, id });
    const year = await Year.findById(id);
    year.name = name;
    await year.save();
    return res.status(200).json({
      status: "ok",
      data: year,
    });
  } catch (error) {
    next(error);
  }
};

export const getYears = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const years = await Year.find(
      req.user.isAdmin
        ? {}
        : {
            _id: req.user.year,
          }
    );
    return res.status(200).json({
      status: "ok",
      data: years,
    });
  } catch (error) {
    next(new NotFoundError("Server is not found"));
  }
};

export const deleteYear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // if (!req.user.isAdmin) throw new Error();
    const { id } = req.params;
    await Year.findByIdAndDelete(id);
    return res.status(200).json({
      status: "ok",
    });
  } catch (error) {
    next(error);
  }
};
