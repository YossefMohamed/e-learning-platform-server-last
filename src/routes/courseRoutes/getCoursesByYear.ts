import { Router } from "express";
import { getCoursesByYear } from "../../controllers/courseControllers";

const router = Router();

router.get("/:year", getCoursesByYear);

export { router as getCoursesByYearRouter };
