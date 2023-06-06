import { body, param } from "express-validator";

export const checkQuestionAnswerValidators = [
  body("index").isNumeric().withMessage("Question answer is not failed"),
];
