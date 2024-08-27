import { redis } from "../index.js"
import Catagories from "../models/catagories.model.js"
import { errorHandler } from "../utils/error.js"

export const addcatagory = async (req,res,next) => {
    try {
        const catagory = await Catagories.create(req.body)
        return res.status(201).json(catagory)
    } catch (error) {
        next(error)
    }
}

export const updatecatagory = async (req,res,next) => {
    try {
        const catagory = await Catagories.findById(req.params.id)
        const data = req.body

        if(!catagory){
            return next(errorHandler(404,"catagory not found"))
        }

        if (data.brands && data.brands.length > 1) {
            const seenBrands = {};
            data.brands = data.brands.filter(brands => {
                const brandKey = `${brands.brand}`;
                if (!seenBrands[brandKey]) {
                    seenBrands[brandKey] = true; 
                    return true; 
                }
                return false;
            });
        }

        if (data.brands && data.brands.length > 1) {
            const seenTypes = {};
            data.brands = data.brands.filter(brands => {
                const brandKey = `${brands.brand}`;
                if (!seenBrands[brandKey]) {
                    seenBrands[brandKey] = true; 
                    return true; 
                }
                return false;
            });
        }

        const updatedcatagory = await Catagories.findByIdAndUpdate(req.params.id,data,{new:true})
        
        res.status(200).json({
            success:true,
            updatedcatagory
        })

    } catch (error) {
        next(error)
    }
}

export const deletecatagory = async (req,res,next) => {
    try {
        const {id} = req.body
        const catagory = await Catagories.findByIdAndDelete(id)
        
        res.status(200).json({
            success:true,
            message:"Catagory deleted"
        })

    } catch (error) {
        next(error)
    }
}


export const getcatagories = async (req,res,next) => {
    try {
        const catagories = await Catagories.find()
        await redis.setex("catagories",60,JSON.stringify(catagories))
        res.status(200).json(catagories)
    } catch (error) {
        next(error)
    }
}
