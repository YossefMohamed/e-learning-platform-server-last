import { Router } from "express";
import { ReviewSubmit } from "../../controllers/submitControllers";

const router = Router();

router.get(
  "/reviews/:lesson",

  ReviewSubmit
);

export { router as ReviewSubmitRouter };
