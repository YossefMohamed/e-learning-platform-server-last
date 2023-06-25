import { Router } from "express";
import { createMessage } from "../../controllers/messageControllers";

const router = Router();

router.post("/", createMessage);

export { router as createMessageRouter };
