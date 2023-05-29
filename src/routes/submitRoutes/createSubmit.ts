import { Router } from "express";
import upload from "../../middlewares/upload";
import { createSubmit } from "../../controllers/submitControllers";
import { createSubmitValidators } from "../../services/submitsValidators/createSubmitValidators";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.post(
  "/:lesson",
  createSubmitValidators,

  validateRequest,
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
  ]),
  createSubmit
);

export { router as createSubmitRouter };
