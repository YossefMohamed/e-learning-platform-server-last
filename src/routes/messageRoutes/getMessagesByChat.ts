import { Router } from "express";
import { getMessagesByChat } from "../../controllers/messageControllers";

const router = Router();

router.get("/:id", getMessagesByChat);

export { router as getMessagesByChatRouter };
