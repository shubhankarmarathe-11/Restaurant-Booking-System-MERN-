import mongoose, { Schema } from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    Fooditems: [
      {
        Foodid: {
          type: Schema.Types.ObjectId,
          ref: "UserDetailSchema",
        },
        Quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    UserDetail: {
      type: Schema.Types.ObjectId,
      ref: "UserDetailSchema",
    },
    Totalprice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cartitem = mongoose.model("Cartitem", CartSchema);

export { Cartitem };
