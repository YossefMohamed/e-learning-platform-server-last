import { Router } from "express";
import { editYear } from "../../controllers/yearControllers";
import { createYearValidators } from "../../services/yearValidators/createYearValidators";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.patch("/:id", createYearValidators, validateRequest, editYear);

export { router as editYearRouter };
