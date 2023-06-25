import { Router } from "express";
import { addChat, getChat, getChats } from "../../controllers/chatControllers";
import { createMessageRouter } from "./createMessage";
import { getMessagesByChat } from "../../controllers/messageControllers";

const messageRouter = Router();

messageRouter.use(createMessageRouter);
messageRouter.use(getMessagesByChat);

export { messageRouter };
