import { body, param } from "express-validator";

export const createSubmitValidators = [
  param("lesson")
    .not()

    .isEmpty()
    .withMessage("lesson Cant Be Empty")
    .isString()
    .withMessage("Select a valid lesson")
    .isMongoId()
    .bail()
    .withMessage("Select a valid lesson"),
];
