import { Request } from "express";
import Chat, { IChat } from "../models/chatSchema";
import { NotFoundError } from "../errors/not-found-error";
import mongoose from "mongoose";

export const addChat = async (req: Request, res, next) => {
  try {
    const users = req.body.users;

    users.push(req.user._id);

    const chatData = {
      users: users,
    };

    let chat: any = null;
    if (users.length === 2) {
      chat = await Chat.findOne({
        users: { $all: users, $size: users.length },
      }).populate([
        {
          path: "users",
        },
        {
          path: "latestMessage",
          select: "content readBy",
        },
      ]);
    }
    if (chat)
      return res.status(200).json({
        status: "ok",
        data: chat,
      });
    chat = await Chat.create(chatData);
    return res.status(200).json({
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
  console.log(req.params.id);

  const chat = await Chat.findById(req.params.id).populate([
    {
      path: "users",
    },
    {
      path: "latestMessage",
      select: "content readBy",
    },
  ]);

  if (!chat) return next(new NotFoundError("Chat is not found"));
  res.status(200).json({
    status: "ok",
    data: chat,
  });
};

export const getChats = async (req: Request, res, next) => {
  const chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
    latestMessage: { $ne: null },
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
