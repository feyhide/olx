import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required: true
    },
    sex:{
        type:String,
        required: true
    },
    brand:{
        type:String,
        required: true
    },
    sizes: [{
        country: { type: String, required: true },
        size: { type: Number, required: true }
    }],
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    imagesUrl:{
        type:[String],
        required:true
    }
},{timestamps:true})

const Product = mongoose.model("Product",productSchema)

export default Product