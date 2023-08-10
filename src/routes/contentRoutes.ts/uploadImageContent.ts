import { Router } from "express";
import upload from "../../middlewares/upload";
import { uploadImageContent } from "../../controllers/contentControllers";

const router = Router();

router.post(
  "/",

  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  uploadImageContent
);

export { router as uploadImageContentRouter };
