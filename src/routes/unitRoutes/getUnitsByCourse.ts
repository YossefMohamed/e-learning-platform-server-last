import { Router } from "express";
import { getUnitsByCourse } from "../../controllers/unitControllers";

const router = Router();

router.get("/:course", getUnitsByCourse);

export { router as getUnitsByCourseRouter };
