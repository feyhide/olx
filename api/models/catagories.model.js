import mongoose from "mongoose";

// Define the brand schema separately
const brandSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    totalitems: {
        type: Number,
        default: 0,
    },
    type: {
        type: [String],
    },
});

// Define the categories schema
const catagoriesSchema = new mongoose.Schema({
    sex: {
        type: String,
        unique: true,
        required: true,
    },
    brands: [brandSchema],
});

const Brand = mongoose.model('Brand', brandSchema);
const Categories = mongoose.model('Categories', catagoriesSchema);

export default Categories;
