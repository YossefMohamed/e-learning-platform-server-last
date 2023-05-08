import { body, param } from "express-validator";

export const createQuestionValidators = [
  body("text").isString().withMessage("Question text must be a string"),
  body("options")
    .isArray({ min: 2, max: 6 })
    .withMessage("Question must have at least 2 and at most 6 options"),
  body("options.*.value")
    .isString()
    .withMessage("Option value must be a string"),
  param("quizId").isMongoId().withMessage("Quiz ID is not valid"),
];
