import { Router } from "express";
import { addChat } from "../../controllers/chatControllers";
import { validateRequest } from "../../middlewares/validate-request";
import { chatValidators } from "../../services/chatValidators/chatValidators";

const router = Router();

router.post("/", chatValidators, validateRequest, addChat);

export { router as addChatRouter };
