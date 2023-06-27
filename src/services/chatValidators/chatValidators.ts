import { body } from "express-validator";

export const chatValidators = [
  body("users")
    .isArray()
    .withMessage("Please enter the users")
    .bail()
    .notEmpty()
    .withMessage("Users cant be empty"),
];
