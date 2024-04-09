const express = require("express")
const orderModel = require("../models/orderModel")

const router = express.Router()

//create oder
router.post("/add", async (req, res) => {
    try {
        let input = req.body
        let data = await orderModel.findOne({ user_id: input.user_id, product_id: input.product_id })
        if (data) {
            res.json({
                status: "error",
                message: "product order is already processing"
            })
        }
        let newOrder = new orderModel(input)
        await newOrder.save()
        res.json({
            status: "success",
            message: "added new order"
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            message: "somthing went to wrong in add order"
        })
    }
})

//view order
router.post("/view", async (req, res) => {
    try {
        let id = req.body.id
        let data = await orderModel.findOne({ user_id: id }).populate("user_id product_id").exec()
        if (!data) {
            res.json({
                status: "error",
                message: "no data found"
            })
        } else {
            res.json({
                status: "success",
                data: data
            })
        }
    } catch (error) {
        console.log(error),
            res.json({
                status: 'error',
                message: "somthing went wrong in view all order"
            })
    }
})

//delete order
router.delete("/delete", async (req, res) => {
    try {
        let id = req.body.id
        let data = await orderModel.findOneAndDelete({user_id: id})
        if (data) {
            res.json({
                status: "success",
                message: "successfully deleted order"
            })
        } else {
            res.json({
                status: "error",
                message: "no data found"
            })
        }
    } catch (error) {
        confirm.log(error)
        res.json({
            status: 'error',
            message: 'somthing went wrong in delete order'
        })
    }
})


module.exports = router