import { Router } from "express";

import { userRouter } from "./userRoutes";
import { courseRouter } from "./courseRoutes";
import { yearRouter } from "./yearRoutes";
import { unitRouter } from "./unitRoutes";
import { lessonRouter } from "./lessonRoutes";
import { QuizRouter } from "./quizRoutes";
import { submitRouter } from "./submitRoutes";
import { chatRouter } from "./chatRoutes";
import { messageRouter } from "./messageRoutes";
import { contentRouter } from "./contentRoutes.ts";

const indexRouter = Router();

indexRouter.use("/submits", submitRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/years", yearRouter);
indexRouter.use("/courses", courseRouter);
indexRouter.use("/units", unitRouter);
indexRouter.use("/lessons", lessonRouter);
indexRouter.use("/quizzes", QuizRouter);
indexRouter.use("/chats", chatRouter);
indexRouter.use("/messages", messageRouter);
indexRouter.use("/content", contentRouter);

export { indexRouter };
