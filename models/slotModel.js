const mongoose = require("mongoose");

const slotModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  time: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("slots",slotModel);
