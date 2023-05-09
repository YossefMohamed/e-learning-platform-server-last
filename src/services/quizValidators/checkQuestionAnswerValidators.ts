import { body, param } from "express-validator";

export const checkQuestionAnswerValidators = [
  body("answer").isNumeric().withMessage("Question answer is not failed"),
  ,
  param("questionId").isMongoId().withMessage("Question ID is not valid"),
];
