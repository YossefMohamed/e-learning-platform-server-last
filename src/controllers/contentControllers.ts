import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found-error";

export const uploadImageContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // if (!req.user.isAdmin) throw new Error();
    return res.status(200).json({
      status: "ok",
      data: {
        image: req.body.image,
      },
    });
  } catch (error) {
    next(new NotFoundError(error.message));
  }
};
