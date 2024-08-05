import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const updateUser = async (req,res,next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"you can only update your own account"))
    }
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser =  await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password:req.body.password,
                avatar: req.body.avatar
            }
        },{new:true})

        const {password:pass,admin,...rest} = updatedUser._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req,res,next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"you can only delete your own account"))
    }

    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: "User deleted"
        })
    } catch (error) {
        next(error)
    }
}

export const addtoCart = async (req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"you can only add cart of your own account"))
    }
    try {
        const { productId, quantity } = req.body; 
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (cartItemIndex > -1) {
            user.cart[cartItemIndex].quantity = quantity;
        } else {
            user.cart.push({ productId, quantity });
        }

        await user.save();

        res.status(200).json({ message: 'Product added to cart successfully', cart: user.cart });
    } catch (error) {
        next(error);
    }
};

export const getCartItems = async (req,res,next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"you can only get your own account's cart"))
    }
    try {
        let cartitems = await User.findById(req.user.id)
        cartitems = cartitems.cart

        res.status(200).json({
            items:cartitems.length,
            cartitems
        })
    } catch (error) {
        next(error)
    }
} 

export const removecartitems = async (req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"you can only remove your own account'cart items"))
    }

    try {
        const { cartitemid } = req.body;

        if (!cartitemid) {
            return res.status(400).json({ success: false, message: 'Cart item ID is required' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!Array.isArray(user.cart)) {
            return res.status(500).json({ success: false, message: 'Cart is not defined or not an array' });
        }

        const cartItemIndex = user.cart.findIndex(item => item._id.toString() === cartitemid);
        if (cartItemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        user.cart.splice(cartItemIndex, 1);
        await user.save();

        res.status(200).json({ success: true, message: 'Cart item removed successfully' });
    } catch (error) {
        console.error('Error removing cart item:', error);
        next(error);
    }
};


export const addOrder = async (req,res,next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"you can only update your own account"))
    }

    try {
        const { items, status } = req.body;
        
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Order must contain at least one item' });
        }
        
        const newOrder = {
            items: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            status
        };

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.order.push(newOrder);
        await user.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        next(error)
    }
} 

export const getOrderItems = async (req,res,next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"you can only get your own account's order"))
    }

    try {
        let orderitems = await User.findById(req.user.id)
        orderitems = orderitems.order

        res.status(200).json({
            items:orderitems.length,
            orderitems
        })
    } catch (error) {
        next(error)
    }
} 

export const getallorders = async (req, res, next) => {
    try {
        const users = await User.find()
        
        const allOrders = users.flatMap(user => 
            user.order.map(order => ({
                ...order.toObject(),
                userId: user._id
            }))
        );
        
        res.status(200).json({
            orders: allOrders
        });
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
