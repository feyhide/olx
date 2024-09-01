import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items : [{
        productRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1 
        }
    }],
    trackingId:{
        type:String
    },
    status:{
        type:String,
        enum: ["pending","dispatch","in process","delivered"],
        default: "pending"
    } 
    
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

export default Order;
