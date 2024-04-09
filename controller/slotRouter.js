const express = require("express");
const slotModel = require("../models/slotModel");

const router = express.Router();

//book a slote
router.post("/book", async (req, res) => {
  try {
    let input = req.body;
    let newSlot = new slotModel(input);
    await newSlot.save();
    res.json({
      status: "success",
      data: newSlot,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "somthing went wrong in book slote",
    });
  }
});

module.exports = router;
