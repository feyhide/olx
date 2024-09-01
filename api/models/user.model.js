import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    address: {
        type:String
    },
    admin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
