import { redis } from "../index.js";
import User from "../models/user.model.js";

export const getallorders = async (req, res, next) => {
    try {
        const users = await User.find()
        
        const allOrders = users.flatMap(user => 
            user.order.map(order => ({
                ...order.toObject(),
                userId: user._id
            }))
        );
        
        await redis.setex("allOrders",60,JSON.stringify(allOrders))
       
        res.status(200).json(allOrders);
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const { status, orderid, userid } = req.body;
        if (!status || !orderid || !userid) {
            return res.status(400).json({ message: 'Status and order ID are required' });
        }

        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const order = user.order.id(orderid);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await user.save();

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        next(error);
    }
};

