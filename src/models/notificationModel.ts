import mongoose, { ObjectId, PopulatedDoc } from "mongoose";
import { IUser } from "./userModel";
import { IQuiz } from "./QuizModel";
import { ILesson } from "./lessonModel";

const Schema = mongoose.Schema;

interface INotification extends mongoose.Document {
  userTo: PopulatedDoc<IUser>;
  opened: boolean;
  notificationType: string;
  entityId: PopulatedDoc<IUser | IQuiz | ILesson>;

  insertNotification(notificationData: {
    userTo: ObjectId;
    notificationType: string;
    entityId: ObjectId;
  }): INotification;
}

const notificationSchema: mongoose.Schema<INotification> =
  new mongoose.Schema<INotification>(
    {
      userTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      opened: {
        type: Boolean,
        default: false,
      },
      notificationType: {
        type: String,
      },
      entityId: {
        type: Schema.Types.ObjectId,
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

// statics accessed directly from the Model
notificationSchema.statics.insertNotification = async (notificationData: {
  userTo: ObjectId;
  notificationType: string;
  entityId: ObjectId;
}) => {
  await Notification.deleteOne(notificationData);
  return Notification.create(notificationData);
};

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
export default Notification;
