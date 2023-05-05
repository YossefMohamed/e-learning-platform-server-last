import { body } from "express-validator";
import User from "../../models/userModel";

export const signupValidators = [
  body("phoneNumber")
    .not()
    .isEmpty()
    .withMessage("Phone number cant be empty")
    .bail()

    .custom(async (value, { req }) => {
      const isDuplicated = (await User.find({ phoneNumber: value })).length;
      if (isDuplicated) throw new Error(`${value} is duplicated!`);
      return true;
    }),
  body("name").not().isEmpty().withMessage("name cant be empty"),
  body("password")
    .isLength({ min: 3, max: 30 })
    .withMessage("Please enter a valid password ")
    .bail()
    .exists()
    .withMessage("Cant be empty"),
  body("passwordConfirmation")
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.password;

      // If password and confirm password not same
      if (password !== confirmPassword) {
        throw new Error("Password and password confirmation are not the same");
      }
    })
    .bail()
    .exists()
    .withMessage("password confirmation Cant be empty"),

  body("isAdmin")
    .not()
    .isEmpty()
    .withMessage("user's authority Cant Be Empty")
    .bail()
    .isBoolean()
    .withMessage("user's authority Cant Be Empty"),
  body("status")
    .not()
    .isEmpty()
    .withMessage("user's status Cant Be Empty")
    .bail()
    .isString()
    .withMessage("user's status Cant Be Empty"),
];
