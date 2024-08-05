import express from 'express'
import { addOrder, addtoCart, deleteUser, getallorders, getCartItems, getOrderItems, removecartitems, updateOrderStatus, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyToken.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()


router.post("/update/:id",verifyToken,updateUser)
router.delete("/delete/:id",verifyToken,deleteUser)
router.post("/addtocart/:id",verifyToken,addtoCart)
router.get("/cart/:id",verifyToken,getCartItems)
router.post("/addorder/:id",verifyToken,addOrder)
router.delete("/removecartitem/:id",verifyToken,removecartitems)
router.get("/orders/:id",verifyToken,getOrderItems)
router.get("/getallorders",verifyAdmin,getallorders)
router.post("/updateorderstatus",verifyAdmin,updateOrderStatus)

export default router