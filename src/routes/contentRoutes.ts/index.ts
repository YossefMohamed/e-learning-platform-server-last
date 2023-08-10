import { Router } from "express";
import { protect } from "../../middlewares/auth";
import { uploadImageContentRouter } from "./uploadImageContent";

const contentRouter = Router();

contentRouter.use(protect);
contentRouter.use(uploadImageContentRouter);

export { contentRouter };
