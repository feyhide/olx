import mongoose from "mongoose";
import { productSchema } from "./product.model.js";

const OrderSchema = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items : [{
        product: productSchema,
        quantity: {
            type: Number,
            default: 1,
            min: 1 
        },
    }],
    trackingId:{
        type:String
    },
    status:{
        type:String,
        enum: ["pending","dispatch","in process","delivered"],
        default: "pending"
    },
    totalPrice:{
        type:Number,
        required:true
    }
    
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

export default Order;
