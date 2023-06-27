import { Router } from "express";
import { getChatsRouter } from "./getChats";
import { getChatRouter } from "./getChat";
import { addChatRouter } from "./addChat";
import { protect } from "../../middlewares/auth";

const chatRouter = Router();

chatRouter.use(protect);
chatRouter.use(getChatsRouter);
chatRouter.use(getChatRouter);
chatRouter.use(addChatRouter);

export { chatRouter };
