import express, { NextFunction, Request, Response } from "express";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../.env") });
import { indexRouter } from "./routes";
import morgan from "morgan";
import { Router } from "express";
import { errorHandler } from "./middlewares/error-handler";
import cors from "cors";

import { NotFoundError } from "./errors/not-found-error";
const app = express();
const corsOptions = { credentials: true, origin: "*" };
app.use(express.static(path.join(__dirname, "../public")));

app.use(cors(corsOptions));
const router = Router();
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running");
});

router.use("/api", indexRouter);
app.use(router);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
