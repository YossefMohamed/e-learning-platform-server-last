import { Router } from "express";
import { getMessagesByChat } from "../../controllers/messageControllers";

const router = Router();

router.post("/", getMessagesByChat);

export { router as getMessagesByChatRouter };
