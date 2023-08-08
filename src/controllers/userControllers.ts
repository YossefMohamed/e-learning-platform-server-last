import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User, { IUser } from "../models/userModel";
import { signIn } from "../middlewares/auth";
import { NotFoundError } from "../errors/not-found-error";
import Year from "../models/yearModel";
import Course from "../models/courseModel";
import { ObjectId } from "mongodb";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import Chat from "../models/chatSchema";
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name, phoneNumber, isAdmin, password, status, year, course } =
      req.body;
    status = status || "active";
    const user: IUser = await User.create({
      name,
      phoneNumber,
      isAdmin: isAdmin ? isAdmin : false,
      password,
      status,
      year: year || null,
      course: course || null,
    });
    const token = signIn(user._id, phoneNumber);
    if (!isAdmin) {
      const admins = await User.find({
        isAdmin: true,
      });

      admins.map(async ({ _id }: { _id: string }) => {
        const users = [_id];

        users.push(user._id);

        const chatData = {
          users: users,
        };

        await Chat.create(chatData);
      });
    }

    res.status(201).json({
      status: "ok",
      data: {
        user: {
          _id: user._id,
          name,
          status,
          phoneNumber,
          isAdmin: isAdmin ? isAdmin : false,
          token,
          year,
          course,
        },
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    data: {
      user: req.user,
    },
  });
};

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!req.user.isAdmin || (!req.user.isAdmin && req.user._id === id))
      return next(new NotAuthorizedError());
    const user = await User.findById(id).populate("course year");

    const name = req.body.name ? req.body.name : user.name;
    const status = req.body.status ? req.body.status : user.status;
    const password = req.body.password;
    const year = req.body.year;
    const course = req.body.course;
    const isAdmin = req.body.isAdmin;
    if (password) user.password = password;
    user.status = status || user.status;
    user.name = name || user.name;
    user.year = year || user.year;
    user.course = course || user.course;
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

    await user.save();
    return res.status(200).json({
      status: "ok",
      data: { user },
    });
  } catch (error) {
    return next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, password } = req.body;
    const user: any = await User.findOne({ phoneNumber });
    req.user = user;

    if (user && (await user.matchPassword(password))) {
      if (user.status === "suspanded")
        return next(
          new NotFoundError(
            "Your account is suspanded please contact the support"
          )
        );
      const token = signIn(user._id, phoneNumber);

      return res.status(200).json({
        status: "ok",
        data: {
          user: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin ? user.isAdmin : false,
            gender: user.name,
            year: user.year,
            course: user.course,
            token,
          },
        },
      });
    }
    return next(new NotFoundError("Phone number or password is wrong"));
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.params;
  if (!req.user.isAdmin) return next(new NotAuthorizedError());
  if (mongoose.Types.ObjectId.isValid(userId)) {
    const user = await User.findById(
      new mongoose.Types.ObjectId(userId)
    ).populate("course year");
    if (user) {
      return res.status(200).json({
        status: "ok",
        data: user,
      });
    }
  }
  next(new Error("User not found"));
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, year } = req.query;
    let users: any;
    if (!req.user.isAdmin) {
      users = await User.find({
        _id: { $ne: req.user._id }, // exclude current user
        name: { $regex: name, $options: "i" },
        isAdmin: true,
      }).populate("course year");
      return res.status(200).json({
        status: "ok",
        data: users,
      });
    }
    if (year && year !== "All years") {
      users = await User.find({
        _id: { $ne: req.user._id }, // exclude current user
        name: { $regex: name, $options: "i" },
        year: new ObjectId(`${year}`),
      }).populate("course year");
    } else {
      users = await User.find({
        _id: { $ne: req.user._id }, // exclude current user
        $or: [{ name: { $regex: name, $options: "i" } }],
      }).populate("course year");
    }

    res.status(200).json({
      status: "ok",
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
export const assignYear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user.isAdmin) throw new NotFoundError("not found");
    const user = await User.findById(req.params);
    const year = await Year.findById(req.body.year);

    user.year = year._id;
    await user.save();

    res.status(200).json({
      status: "ok",
      data: user,
    });
  } catch (error: any) {
    next(error);
  }
};

export const assignCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user.isAdmin) throw new NotFoundError("not found");
    const user = await User.findById(req.params);
    const course = await Course.findById(req.body.Course);

    user.course = course._id;
    await user.save();

    res.status(200).json({
      status: "ok",
      data: user,
    });
  } catch (error: any) {
    next(error);
  }
};
