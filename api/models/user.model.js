import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const userOrderSchema = new mongoose.Schema({
    items:{
        type:[cartItemSchema],
        required:true
    },
    status:{
        type:String,
        enum: ["pending","dispatch","in process","delivered"],
        required: true
    }    
},{timestamps:true});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    cart: [cartItemSchema],
    order: [userOrderSchema]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
