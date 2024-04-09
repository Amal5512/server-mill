const mongoose=require("mongoose")

const orderModel=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        required:true
    },
    date:{
        type:Date,
        default:Date.now(),
        required:true
    }, 
})

module.exports=mongoose.model("orders",orderModel)