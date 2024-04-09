const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const userRouter=require("./controller/userrouter")
const cartRouter=require("./controller/cartRouter")
const productRouter=require("./controller/productRouter")
const adminRouter=require("./controller/adminRouter")
const orderRouter=require("./controller/orderRouter")

const app=express()


app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://amalanil:Amal5512@cluster0.ucdgacu.mongodb.net/demo2db?retryWrites=true&w=majority",
{useNewUrlParser:true}

)


app.use("/user", userRouter);
app.use("/cart",cartRouter)
app.use("/product", productRouter);
app.use("/admin", adminRouter);
app.use("/order", orderRouter);





app.listen(3011,()=>{
    console.log("server is running")
})