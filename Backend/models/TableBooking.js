import mongoose, { Schema } from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    BookedTables: [
      {
        type: Schema.Types.ObjectId,
        ref: "TableSchema",
      },
    ],

    UserDetail: {
      type: Schema.Types.ObjectId,
      ref: "UserDetailSchema",
    },

    Date: {
      type: String,
    },
    Time: {
      type: String,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("BookingSchema", BookingSchema);

export { Booking };
