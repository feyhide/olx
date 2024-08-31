import { redis } from "../index.js"
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
        await redis.setex("products",60,JSON.stringify(products))
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

export const getProduct = async (req,res,next) => {
    try {
        const product = await Product.findById(req.params.id)
        await redis.setex("product",60,JSON.stringify(product))
        res.status(200).json(product)
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
        const limit = parseInt(req.query.limit, 10) || 10;
        const page = parseInt(req.query.page, 10) || 0;
        const type = req.query.type || "";
        const sex = req.query.sex || "";
        const brand = req.query.brand || "";
        const title = req.query.title || "";
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";
        
        const sizes = req.query.sizes ? req.query.sizes.split(',').map(size => parseFloat(size)) : [];
        const countries = req.query.countries ? req.query.countries.split(',') : [];

        const cacheKey = `search:${title}:${type}:${sex}:${brand}:${sizes.join('-')}:${countries.join('-')}:${sort}:${order}:${limit}:${page}`;

        const cachedResults = await redis.get(cacheKey);
        if (cachedResults) {
            console.log("cached");
            return res.status(200).json(JSON.parse(cachedResults));
        }

        const query = {};
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }
        if (type) {
            query.type = type;
        }
        if (sex) {
            query.sex = sex;
        }
        if (brand) {
            query.brand = brand;
        }
        if (sizes.length > 0) {
            query['sizes.size'] = { $in: sizes };
        }
        if (countries.length > 0) {
            query['sizes.country'] = { $in: countries };
        }

        const total = await Product.countDocuments(query);

        const products = await Product.find(query)
            .sort({ [sort]: order })
            .limit(limit)
            .skip(page * limit);

        const response = { total, products };

        await redis.setex(cacheKey, 15, JSON.stringify(response));

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};
