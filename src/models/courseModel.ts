import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { IYear } from "./yearModel";

export interface ICourse extends Document {
  name: string;
  year: PopulatedDoc<IYear>;
}

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - lastName
 *        - gender
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    UserSignInInput:
 *      required:
 *        - email
 *        - password
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 */

const courseSchema: Schema<ICourse> = new mongoose.Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },

    year: {
      type: mongoose.Types.ObjectId,
      ref: "Year",
      required: true,
    },
  },
  {
    timestamps: true,

    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
      virtuals: true,
    },
  }
);

const Course = mongoose.model<ICourse>("Course", courseSchema);
export default Course;
