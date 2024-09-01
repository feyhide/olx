import { redis } from "../index.js";
import Order from "../models/order.model.js";

export const getallorders = async (req, res, next) => {
    try {
        const orders = await Order.find()
        
        await redis.setex("orders",60,JSON.stringify(orders))
       
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const {status,orderid} = req.body;

        if (!status || !orderid) {
            return res.status(400).json({ message: 'Status and order ID are required' });
        }

        const order = await Order.findById(orderid);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

export const addOrder = async (req,res,next) => {
    try {
        
        if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
            return res.status(400).json({ message: 'Order must contain at least one item' });
        }
        

        const order = new Order(req.body);
        await order.save();


        res.status(201).json(order);
    } catch (error) {
        next(error)
    }
} 

export const getUserOrder = async (req,res,next) => {
    try {
        let orders = await Order.find({userRef:req.params.id})
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
} 
