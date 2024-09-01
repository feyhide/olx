import express from 'express'
import { deleteCachedData, deleteCachedUser, getCachedData, getCachedUser } from '../utils/redis.js'
import { addOrder, getallorders, getUserOrder, updateOrderStatus } from '../controllers/order.controller.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.post("/addorder/:id",verifyToken,deleteCachedUser("orders"),addOrder)
router.get("/userorders/:id",verifyToken,getCachedUser("orders"),getUserOrder)
router.get("/getallorder",verifyAdmin,getCachedData("allOrders"),getallorders)
router.post("/updateorderstatus",verifyAdmin,deleteCachedData("allOrders"),updateOrderStatus)

export default router