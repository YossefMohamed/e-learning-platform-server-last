import { body, param } from "express-validator";

export const editQuestionValidators = [
  body("text")
    .not()
    .isEmpty()
    .withMessage("Question title cant be empty")
    .isString()
    .withMessage("Question text must be a string"),
  body("options")
    .isArray({ min: 2, max: 6 })
    .withMessage("Question must have at least 2 and at most 6 options"),
  body("options.*.value")
    .isString()
    .withMessage("Option value must be a string"),
  param("questionId").isMongoId().withMessage("Quiz ID is not valid"),
];
