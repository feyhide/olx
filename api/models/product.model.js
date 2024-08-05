import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum: ["shirt", "sweatshirt", "chain", "ring", "bracelet","watch","pants","eyewear","bag","belt"],
        required: true
    },
    regularPrice:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number,
    },
    quantity:{
        type:Number,
        required:true
    },
    imageUrls:{
        type:Array,
        required:true
    }
},{timestamps:true})

const Product = mongoose.model("Product",productSchema)

export default Product