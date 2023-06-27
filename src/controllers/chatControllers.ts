import { Request } from "express";
import Chat, { IChat } from "../models/chatSchema";
import { NotFoundError } from "../errors/not-found-error";
import mongoose from "mongoose";

export const addChat = async (req: Request, res, next) => {
  try {
    const users = req.body.users;

    users.push(req.user);

    const chatData = {
      users: users,
    };

    let chat: IChat | null = null;
    if (users.length === 2) {
      chat = await Chat.findOne({
        users: users,
      });
    }
    if (!chat) {
      chat = await Chat.create(chatData);
    }
    res.status(200).json({
      status: "ok",
      data: chat,
    });
  } catch (error) {
    next(new NotFoundError("Chat is not found"));
  }
};

export const getChat = async (req: Request, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).json({
      status: "failed",
      message: "Not Found",
    });
  if (!req.user) return res.redirect("/");
  const chat = await Chat.findOne({
    _id: req.params.id,
    users: { $in: [req.user?._id] },
  }).populate("users");
  if (!chat)
    return res.status(404).json({
      status: "failed",
      message: "Chat not found!",
    });
  res.status(200).json({
    status: "ok",
    data: chat,
  });
};

export const getChats = async (req: Request, res, next) => {
  console.log(req.user);
  const chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate([
      {
        path: "users",
      },
      {
        path: "latestMessage",
        select: "content readBy",
      },
    ])
    .sort({ updatedAt: -1 });

  res.status(200).json({
    status: "ok",
    data: chats,
  });
};
