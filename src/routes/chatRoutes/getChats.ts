import { Router } from "express";
import { getChats } from "../../controllers/chatControllers";

const router = Router();

router.get("/", getChats);

export { router as getChatsRouter };
