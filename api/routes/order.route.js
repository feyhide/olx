import express from 'express'
import { deleteCachedData, getCachedData } from '../utils/redis.js'
import { getallorders, updateOrderStatus } from '../controllers/order.controller.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

router.get("/getallorders",verifyAdmin,getCachedData("allOrders"),getallorders)
router.post("/updateorderstatus",verifyAdmin,deleteCachedData("allOrders"),updateOrderStatus)

export default router