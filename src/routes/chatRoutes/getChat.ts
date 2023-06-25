import { Router } from "express";
import { getChat } from "../../controllers/chatControllers";

const router = Router();

router.get("/:id", getChat);

export { router as getChatRouter };
