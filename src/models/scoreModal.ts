import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { ICourse } from "./courseModel";
import { IQuestion } from "./QuizModel";
import { IUser } from "./userModel";

export interface IScore extends Document {
  score: boolean;
  question: PopulatedDoc<IQuestion>;
  student: PopulatedDoc<IUser>;
}

const ScoreSchema: Schema<IScore> = new mongoose.Schema<IScore>({
  score: {
    type: Boolean,
    required: true,
  },

  question: {
    type: mongoose.Types.ObjectId,
    ref: "Question",
    required: true,
  },

  student: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Score = mongoose.model<IScore>("Score", ScoreSchema);
export default Score;
