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

//view all soltes
router.post("/viewall", async (req, res) => {
  try {
    let input = req.body;
    let data = await slotModel.find({ date: input.date }).populate("userId","-password").exec();
    if (data) {
      res.json({
        status: "success",
        data: data,
      });
    } else {
      res.json({ status: "error", message: "no data found" });
    }
  } catch (error) {
    console.error(error);
    res.json({
      status: "error",
      message: "somthing went wrong in view all slotes",
    });
  }
});
module.exports = router;
