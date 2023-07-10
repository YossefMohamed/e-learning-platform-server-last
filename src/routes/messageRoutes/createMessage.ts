import { Router } from "express";
import { createMessage } from "../../controllers/messageControllers";

const router = Router();

router.post("/:id", createMessage);

export { router as createMessageRouter };
