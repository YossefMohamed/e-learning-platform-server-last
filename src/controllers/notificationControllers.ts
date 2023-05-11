import { Request, Response, NextFunction } from "express";
import Notification from "../models/notificationModel";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const getNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notifications = await Notification.find({
      userTo: req.user._id,
      notificationType: { $ne: "newMessage" },
    })
      .populate("userTo")
      .populate("userFrom")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "ok",
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

export const markAllAsReadNotification = async (req: Request, res, next) => {
  try {
    const notifications = await Notification.updateMany(
      {
        userTo: new ObjectId(req.user?._id),
      },
      {
        opened: true,
      }
    );

    res.status(200).json({
      status: "ok",
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

export const markAsReadNotification = async (req: Request, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).json({
        status: "failed",
        message: "Not Found",
      });
    const notification = await Notification.findByIdAndUpdate(
      new ObjectId(req.params.id),
      {
        opened: true,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "ok",
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};
