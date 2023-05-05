import { Router } from "express";
import { deleteYear } from "../../controllers/yearControllers";

const router = Router();

router.delete("/:id", deleteYear);

export { router as deleteYearRouter };
