import { body } from "express-validator";

export const addScoreValidators = [
  body("score").isNumeric().withMessage("Score is not failed"),
];
