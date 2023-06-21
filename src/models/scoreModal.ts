import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { IQuiz } from "./QuizModel";
import { IUser } from "./userModel";

export interface IScore extends Document {
  score: number;
  quiz: PopulatedDoc<IQuiz>;
  student: PopulatedDoc<IUser>;
}

const ScoreSchema: Schema<IScore> = new mongoose.Schema<IScore>({
  score: {
    type: Number,
    required: true,
  },

  quiz: {
    type: mongoose.Types.ObjectId,
    ref: "Quiz",
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
