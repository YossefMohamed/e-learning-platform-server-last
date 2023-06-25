import { Router } from "express";
import { addChat } from "../../controllers/chatControllers";

const router = Router();

router.post("/", addChat);

export { router as addChatRouter };
