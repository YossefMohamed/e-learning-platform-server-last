import { Router } from "express";
import { getYears } from "../../controllers/yearControllers";

const router = Router();

router.get("/", getYears);

export { router as getYearsRouter };
