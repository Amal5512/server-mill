const express = require("express");
const productModel = require("../models/productModel");
const router = express.Router();

//add product
router.post("/add", async (req, res) => {
  try {
    let data = req.body;
    let productModelObj = new productModel(data);
    await productModelObj.save();
    res.json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "somthing went worng on adding product router.",
    });
  }
});

//view all products
router.get("/viewall", async (req, res) => {
  try {
    let data = await productModel.find();
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: "error",
      message: "somthhing went wrong in view all products",
    });
  }
});
module.exports = router;
