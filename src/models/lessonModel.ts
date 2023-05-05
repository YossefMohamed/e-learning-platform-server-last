import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { IUnit } from "./unitModel";
import { ICourse } from "./courseModel";

export interface ILesson extends Document {
  name: string;
  video: string;
  file: string;
  assignment: string;
  description: string;
  extra: string;
  quiz: string;
  unit: PopulatedDoc<IUnit>;
  course: PopulatedDoc<ICourse>;
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

const LessonSchema: Schema<ILesson> = new mongoose.Schema<ILesson>(
  {
    name: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
    assignment: {
      type: String,
    },
    description: {
      type: String,
    },
    extra: {
      type: String,
    },
    quiz: {
      type: String,
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  {
    timestamps: true,

    virtuals: true,
  }
);

const Lesson = mongoose.model<ILesson>("Lesson", LessonSchema);
export default Lesson;
