import { Router } from "express";
import { createYear } from "../../controllers/yearControllers";
import { createYearValidators } from "../../services/yearValidators/createYearValidators";
import { validateRequest } from "../../middlewares/validate-request";
import upload from "../../middlewares/upload";

const router = Router();

router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createYearValidators,
  validateRequest,
  createYear
);

export { router as createYearRouter };
