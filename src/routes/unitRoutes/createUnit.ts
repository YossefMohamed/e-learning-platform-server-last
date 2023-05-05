import { Router } from "express";
import { createUnit } from "../../controllers/unitControllers";
import { createUnitValidators } from "../../services/unitValidators/createUnitValidators";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.post("/", createUnitValidators, validateRequest, createUnit);

export { router as createUnitRouter };
