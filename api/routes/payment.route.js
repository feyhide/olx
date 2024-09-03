import express from 'express'
import { deleteCachedData, deleteCachedUser, getCachedData, getCachedUser } from '../utils/redis.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'
import { verifyToken } from '../utils/verifyToken.js'
import { stripeCheckout } from '../controllers/payment.controller.js'

const router = express.Router()

router.post("/checkout/:id",verifyToken,stripeCheckout)

export default router