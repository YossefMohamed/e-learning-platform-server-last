import { Router } from "express";

import { userRouter } from "./userRoutes";
import { courseRouter } from "./courseRoutes";
import { yearRouter } from "./yearRoutes";
import { unitRouter } from "./unitRoutes";
import { lessonRouter } from "./lessonRoutes";
import { QuizRouter } from "./quizRoutes";
import { submitRouter } from "./submitRoutes";

const indexRouter = Router();

indexRouter.use("/submit", submitRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/years", yearRouter);
indexRouter.use("/courses", courseRouter);
indexRouter.use("/units", unitRouter);
indexRouter.use("/lessons", lessonRouter);
indexRouter.use("/quizzes", QuizRouter);

export { indexRouter };
