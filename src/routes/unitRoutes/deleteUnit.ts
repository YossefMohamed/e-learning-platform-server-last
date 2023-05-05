import { Router } from "express";
import { deleteUnit } from "../../controllers/unitControllers";

const router = Router();

router.delete("/:id", deleteUnit);

export { router as deleteUnitRouter };
