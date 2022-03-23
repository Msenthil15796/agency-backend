const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    clientId: {
      type: Number,
      required: true,
      unique: true,
    },
    agencyId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    totalBill: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
