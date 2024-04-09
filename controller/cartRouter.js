const express = require("express");
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const mongoose = require("mongoose");

const router = express.Router();

//incrementing or adding new cart item
router.post("/add", async (req, res) => {
  try {
    let userId = req.body.userId;
    let productId = req.body.productId;
    console.log(userId)
    console.log(productId)
    let data = await cartModel
      .findOne({ userId: userId, productId: productId })
      .populate("productId")
      .exec();
    let productData = await productModel.findById(productId);
    if (data) {
      data.quantity += productData.productQuantity;
      data.totalPrice += productData.productPrice;
      await data.save();
      res.status(200).json({
        status: "incremented successfully",
        cartData: data,
      });
    } else {
      let cartModelObj = new cartModel(req.body);
      let cartData = await cartModelObj.save(); 
      res.json({
        status: "success",
        cartData: cartData,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong in adding to the cart.",
    });
  }
});

//view all cart items by userid
router.get("/view", async (req, res) => {
  try {
    let userId = req.body.userId;
    // Find cart items for the specific user ID
    const data = await cartModel
      .find({ userId })
      .populate("userId productId")
      .exec();
    res.json({
      status: "success",
      cartItems: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "somthing went wrong on view all cart items.",
    });
  }
});

//delete cart item by id
router.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await cartModel.findByIdAndDelete(id);
    res.json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "something went wrong on delete cart item by id.",
    });
  }
});


module.exports = router;
