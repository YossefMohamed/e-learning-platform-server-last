import { Router } from "express";
import upload from "../../middlewares/upload";
import { createSubmit } from "../../controllers/submitControllers";

const router = Router();

router.post(
  "/:lesson",

  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
  ]),
  createSubmit
);

export { router as createSubmitRouter };
