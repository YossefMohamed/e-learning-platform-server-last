import { Router } from "express";
import { editUnit } from "../../controllers/unitControllers";

const router = Router();

router.patch("/:id", editUnit);

export { router as editUnitRouter };
