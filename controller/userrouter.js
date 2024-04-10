const express = require("express");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const usermodel = require("../models/userModel");

const router = express.Router();

//signup
const hashFunction = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
router.post("/signup", async (req, res) => {
  try {
    let inputPassword = req.body.password;
    let data = req.body;
    let hashedPass = await hashFunction(inputPassword);
    data.password = hashedPass;
    let userModelObj = new userModel(data);
    await userModelObj.save();
    res.json({ status: "success" });
  } catch (error) {
    console.log("error");
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred during the signup process.",
    });
  }
});

//signin
router.post("/signin", async (req, res) => {
  try {
    let inputPassword = req.body.password;
    let email = req.body.email;
    let data = await userModel.findOne({ email: email });
    if (!data) {
      return res.json({
        status: "no user",
      });
    }
    let dbPassword = data.password;
    let match = await bcrypt.compare(inputPassword, dbPassword);
    if (!match) {
      return res.json({
        status: "incorrect password",
      });
    }
    res.json({
      status: "success",
      userData: data,
    });
  } catch (error) {
    console.error(error);
    console.log("error occured");
    res.status(500).json({
      status: "error",
      message: "An error occurred during the sign in process.",
    });
  }
});

//search for user by id
router.post("/search", async (req, res) => {
  try {
    let id = req.body.id;
    console.log(id)
    let data = await usermodel.findById(id);
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: "error",
      message: "somthing went wrong in search user by id",
    });
  }
});

module.exports = router;
