import Product from "../models/product.model.js"
import { errorHandler } from "../utils/error.js"

export const addProduct = async (req,res,next) => {
    try {
        const product = await Product.create(req.body)
        return res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}

export const getProducts = async (req,res,next) => {
    try {
        const products = await Product.find()
        res.status(200).json({
            items:products.length,
            products
        })
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req,res,next) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message:"product deleted"
        })
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req,res,next) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product){
            return next(errorHandler(404,"product not found"))
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({
            success:true,
            updatedProduct
        })
    } catch (error) {
        next(error)
    }
}

export const searchProducts = async (req, res, next) => {
    try {
        const limit = parseInt(req.params.limit) || 10;
        const page = parseInt(req.params.page) || 0;
        const type = req.body.type;
        const term = req.params.term || "";
        const sort = req.params.sort || "createdAt";
        const order = req.params.order || "desc";

        const query = {
            title: { $regex: term, $options: 'i' }
        };

        if (type) {
            query.type = type;
        }

        const products = await Product.find(query)
            .sort({ [sort]: order })
            .limit(limit)
            .skip(page);

        return res.status(200).json({
            items: products.length,
            products
        });
    } catch (error) {
        next(error);
    }
}
