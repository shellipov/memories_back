import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  events: { type: Array, required: true },
  places: { type: Array, required: true },
  friends: { type: Array, required: true },
});

const eventSchema = new mongoose.Schema({
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "users",
  // },
  creator: String,
  title: String,
  date: String,
  place_name: String,
  position: Object,
  address: String,
  description: String,
  photos: Array,
});

const photoSchema = new mongoose.Schema({
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "users",
  // },
  creator: String,
  eventID: String,
  title: String,
  img: String,
  description: String,
});

const userModel = mongoose.model("users", userSchema);
const eventModel = mongoose.model("events", eventSchema);
const photoModel = mongoose.model("photos", photoSchema);

export { userModel, eventModel, photoModel };
