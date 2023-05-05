import { body } from "express-validator";

export const createCourseValidators = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name Cant Be Empty")
    .isString()
    .withMessage("Please Enter A Valid Name string")
    .bail()
    .isLength({ min: 3, max: 30 })
    .bail()
    .withMessage("Please Enter A Valid  Name"),
  body("year")
    .not()

    .isEmpty()
    .withMessage("Year Cant Be Empty")
    .isString()
    .withMessage("Select a valid year")
    .isMongoId()
    .bail()
    .withMessage("Select a valid year"),
];
