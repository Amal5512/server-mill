const express = require("express");
const adminModel = require("../models/adminModel");
const staffModel = require("../models/staffModel");

const router = express.Router();

//admin signin
router.post("/signin", async (req, res) => {
  try {
    let input = req.body;
    let inputEmail = input.email;
    let inputPassword = input.password;
    let data = await adminModel.findOne({ email: inputEmail });
    if (!data) {
      res.json({
        status: "error",
        message: "no user found",
      });
    } else {
      let dbPassword = data.password;
      if (dbPassword === inputPassword) {
        res.json({
          status: "success",
          message: "authentification success",
        });
      } else {
        res.json({
          status: "error",
          message: "incorrect password",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.json({
      status: "error",
      message: "somthing went wrong in admin signin",
    });
  }
});

//add staff by admin
router.post("/addStaff", async (req, res) => {
  try {
    let input = req.body;
    let newStaff = new staffModel(input);
    await newStaff.save();
    res.json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: "error",
      message: "somthing went wrong in add staff by admin",
    });
  }
});
module.exports = router;
