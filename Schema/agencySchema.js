const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema(
  {
    agencyId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address_line1: {
      type: String,
      required: true,
    },
    address_line2: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agency", agencySchema);
