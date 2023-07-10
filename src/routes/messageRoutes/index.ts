import { Router } from "express";
import { createMessageRouter } from "./createMessage";
import { getMessagesByChatRouter } from "./getMessagesByChat";
import { protect } from "../../middlewares/auth";

const messageRouter = Router();

messageRouter.use(protect);
messageRouter.use(createMessageRouter);
messageRouter.use(getMessagesByChatRouter);

export { messageRouter };
