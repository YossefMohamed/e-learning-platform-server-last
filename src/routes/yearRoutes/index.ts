import { Router } from "express";
import { createYearRouter } from "./createYear";
import { getYearsRouter } from "./getYears";
import { editYearRouter } from "./editYear";
import { protect } from "../../middlewares/auth";
import { deleteYearRouter } from "./deleteYear";

const yearRouter = Router();

yearRouter.use(protect);
yearRouter.use(getYearsRouter);
yearRouter.use(createYearRouter);

yearRouter.use(deleteYearRouter);
yearRouter.use(editYearRouter);

export { yearRouter };
