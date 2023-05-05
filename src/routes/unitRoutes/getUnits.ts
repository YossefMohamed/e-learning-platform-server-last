import { Router } from "express";
import { getUnits } from "../../controllers/unitControllers";

const router = Router();

router.get("/", getUnits);

export { router as getUnitsRouter };
