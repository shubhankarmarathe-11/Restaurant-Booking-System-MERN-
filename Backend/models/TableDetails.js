import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  TableNumber: {
    type: Number,
    required: true,
    unique: true,
  },

  Seats: {
    type: Number,
    required: true,
  },

  ReservationStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Table = mongoose.model("TableSchema", TableSchema);

export { Table };
