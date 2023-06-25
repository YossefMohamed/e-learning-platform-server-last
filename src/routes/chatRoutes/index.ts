import { Router } from "express";
import { addChat, getChat, getChats } from "../../controllers/chatControllers";

const chatRouter = Router();

chatRouter.use(addChat);
chatRouter.use(getChat);
chatRouter.use(getChats);

export { chatRouter };
