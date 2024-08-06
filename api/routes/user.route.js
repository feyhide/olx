import express from 'express'
import { addOrder, addtoCart, deleteUser, getallorders, getCartItems, getOrderItems, getUser, removecartitems, updateOrderStatus, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyToken.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'
import { deleteCachedData, deleteCachedUser, getCachedData, getCachedUser } from '../utils/redis.js'

const router = express.Router()

router.get("/profile/:id",verifyToken,getCachedUser("profile"),getUser)
router.post("/update/:id",verifyToken,deleteCachedUser("profile"),updateUser)
router.delete("/delete/:id",verifyToken,deleteCachedUser("profile"),deleteUser)
router.post("/addtocart/:id",verifyToken,deleteCachedUser("cart"),addtoCart)
router.get("/cart/:id",verifyToken,getCachedUser("cart"),getCartItems)
router.delete("/removecartitem/:id",verifyToken,deleteCachedUser("cart"),removecartitems)
router.post("/addorder/:id",verifyToken,deleteCachedUser("orders"),addOrder)
router.get("/orders/:id",verifyToken,getCachedUser("orders"),getOrderItems)
router.get("/getallorders",verifyAdmin,getCachedData("allOrders"),getallorders)
router.post("/updateorderstatus",verifyAdmin,deleteCachedData("allOrders"),updateOrderStatus)

export default router