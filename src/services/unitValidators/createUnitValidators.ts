import { body } from "express-validator";

export const createUnitValidators = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name Cant Be Empty")
    .isString()
    .withMessage("Please Enter A Valid Name string")
    .bail()
    .isLength({ min: 3, max: 50 })
    .bail()
    .withMessage("Please Enter A Valid  Name"),
];
