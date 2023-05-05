import mongoose from "mongoose";
import { DatabaseConnectionError } from "./errors/database-connection-error";
const connectDB = () => {
  try {
    mongoose.connect(process.env.dbURI).then(() => console.log("Connected!"));
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

export { connectDB };
