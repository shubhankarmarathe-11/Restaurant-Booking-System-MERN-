import mongoose, { Schema } from "mongoose";

const UserDetailSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Number: {
    type: String,
    default: "",
  },
  Password: {
    type: String,
    default: "",
  },
  GoogleId: {
    type: String,
    default: "",
  },
  ProfileUrl: {
    type: String,
    default: "",
  },
  BookedTables: {
    type: Schema.Types.ObjectId,
    ref: "BookingSchema",
  },
});

const User = mongoose.model("UserDetailSchema", UserDetailSchema);

export { User };
