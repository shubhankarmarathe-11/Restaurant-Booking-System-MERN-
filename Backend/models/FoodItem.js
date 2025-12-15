import mongoose from "mongoose";

const FooditemSchema = new mongoose.Schema({
  Foodtype: {
    type: String,
    required: true,
  },
  FoodName: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  ImageUrl: {
    type: String,
    required: true,
    default: "",
  },
});

const Fooditem = mongoose.model("Fooditem", FooditemSchema);

export { Fooditem };
