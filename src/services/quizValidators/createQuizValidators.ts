import { body, param } from "express-validator";

export const createQuizValidators = [
  param("lesson").isMongoId().withMessage("Quiz ID is not valid"),
];
