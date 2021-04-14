import mongoose from "mongoose";
import dotenv from "dotenv";
import { userModel, eventModel, photoModel } from "../database.js";
import { user, events, photos } from "./data.js";
dotenv.config();

mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@memories.np8je.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

async function seeds() {
  // await new userModel(user).save();
  // events.forEach((event) => new eventModel(event).save());
  photos.forEach((photo) => new photoModel(photo).save());
}

seeds();
