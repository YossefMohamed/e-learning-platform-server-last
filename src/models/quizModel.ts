import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";

import { ILesson } from "./lessonModel";
import { IUser } from "./userModel";

export interface IQuiz extends Document {
  questions: Array<IQuestion>;
  lesson: PopulatedDoc<ILesson>;
  takenBy: [
    {
      user: PopulatedDoc<IUser>;
      score: number;
    }
  ];
}

export interface IQuestion extends Document {
  text: string;
  options: Array<IOption>;
}

export interface IOption extends Document {
  value: string;
  selected: boolean;
}

const OptionSchema: Schema<IOption> = new mongoose.Schema<IOption>(
  {
    value: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

const QuestionSchema: Schema<IQuestion> = new mongoose.Schema<IQuestion>(
  {
    text: {
      type: String,
      required: true,
    },
    options: [
      {
        type: OptionSchema,
      },
    ],
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

const QuizSchema: Schema<IQuiz> = new mongoose.Schema<IQuiz>(
  {
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    takenBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false,
        },
        score: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);
export const Question = mongoose.model<IQuestion>("Question", QuestionSchema);
export const Option = mongoose.model<IOption>("Option", OptionSchema);
