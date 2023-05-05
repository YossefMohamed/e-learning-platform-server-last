import { body } from "express-validator";

export const signinValidators = [
  body("phoneNumber")
    .exists()
    .trim()
    .withMessage("Please enter a valid phone number"),
  body("password").exists().withMessage("Password Must Be Between 8 and 20"),
];
