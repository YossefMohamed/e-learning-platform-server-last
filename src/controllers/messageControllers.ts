import { Request } from "express";
import Chat, { IChat } from "../models/chatModel";
import Message, { IMessage } from "../models/messageModel";
import mongoose from "mongoose";
import { NotFoundError } from "../errors/not-found-error";

export const createMessage = async (req: Request, res, next) => {
  try {
    const { content } = req.body;
    const { id: chat } = req.params;

    if (!(content && chat)) {
      throw new NotFoundError("data not completed");
    }
    let message = await Message.create({
      sender: req.user?._id,
      content,
      chat,
      readBy: [req.user?._id],
    });

    message = await message.populate([
      {
        path: "chat",
        populate: {
          path: "users",
        },
      },
      {
        path: "sender",
      },
    ]);
    await Chat.findByIdAndUpdate(chat, {
      latestMessage: message,
    });

    res.status(200).json({
      status: "ok",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessagesByChat = async (req: Request, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      throw new NotFoundError("Chat is not found");

    const messages = await Message.find({
      chat: req.params.id,
    }).populate("sender");

    await Message.updateMany(
      {
        chat: req.params.id,
      },
      {
        $addToSet: { readBy: req.user?._id },
      }
    );
    res.status(200).json({
      status: "ok",
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};
