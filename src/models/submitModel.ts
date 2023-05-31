import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { ILesson } from "./lessonModel";
import { IUnit } from "./unitModel";

export interface ISubmit extends Document {
  lesson: PopulatedDoc<ILesson>;
  user: PopulatedDoc<IUnit>;
  reviewed: boolean;
  mark: number;
  file: string;
  refMark: number;
}

const SubmitSchema: Schema<ISubmit> = new mongoose.Schema<ISubmit>(
  {
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
    file: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
    mark: {
      type: Number,
      default: 0,
    },
    refMark: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Submit = mongoose.model<IUnit>("Submit", SubmitSchema);
export default Submit;
