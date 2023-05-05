import { body } from "express-validator";

export const createYearValidators = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name Cant Be Empty")
    .isString()
    .withMessage("Please Enter A Valid Name ")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Name Cant Be Empty")
    .bail()
    .isLength({ min: 3, max: 30 })
    .bail()
    .withMessage("Please Enter A Valid  Name"),
];
