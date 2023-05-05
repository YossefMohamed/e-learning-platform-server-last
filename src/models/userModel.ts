import bcrypt from "bcrypt";
import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { IYear } from "./yearModel";
import { ICourse } from "./courseModel";

export interface IUser extends Document {
  name: string;
  phoneNumber: string;
  isAdmin: boolean;
  status: "active" | "suspanded";
  password: string;
  year?: PopulatedDoc<IYear>;
  course?: PopulatedDoc<ICourse>;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
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

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "suspanded",
      enum: ["suspanded", "active"],
    },

    year: {
      type: mongoose.Types.ObjectId,
      ref: "Year",
      required: false,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: false,
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

userSchema.pre("save", async function (this, next: any) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

userSchema.methods.matchPassword = async function (
  this,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
