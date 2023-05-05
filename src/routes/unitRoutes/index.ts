import { Router } from "express";
import { protect } from "../../middlewares/auth";
import { createUnitRouter } from "./createUnit";
import { deleteUnitRouter } from "./deleteUnit";
import { editUnitRouter } from "./editUnit";
import { getUnitsRouter } from "./getUnits";
import { getUnitsByCourseRouter } from "./getUnitsByCourse";

const unitRouter = Router();
unitRouter.use(getUnitsRouter);
unitRouter.use(getUnitsByCourseRouter);

unitRouter.use(protect);
unitRouter.use(createUnitRouter);
unitRouter.use(deleteUnitRouter);

unitRouter.use(editUnitRouter);

export { unitRouter };
