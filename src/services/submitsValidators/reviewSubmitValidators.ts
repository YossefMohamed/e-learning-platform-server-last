import { body, param } from "express-validator";

export const reviewSubmitValidators = [
  param("id")
    .not()

    .isEmpty()
    .withMessage("lesson Cant Be Empty")
    .isString()
    .withMessage("Select a valid lesson")
    .isMongoId()
    .bail()
    .withMessage("Select a valid lesson"),
  body("mark")
    .not()
    .isEmpty()
    .withMessage("mark Cant Be Empty")
    .isNumeric()
    .withMessage("mark must be a number"),
  body("refMark")
    .not()
    .isEmpty()
    .withMessage("refMark Cant Be Empty")
    .isNumeric()
    .withMessage("refMark must be a number"),
];
