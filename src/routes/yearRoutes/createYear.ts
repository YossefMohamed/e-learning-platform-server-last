import { Router } from "express";
import { createYear } from "../../controllers/yearControllers";
import { createYearValidators } from "../../services/yearValidators/createYearValidators";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.post("/", createYearValidators, validateRequest, createYear);

export { router as createYearRouter };
