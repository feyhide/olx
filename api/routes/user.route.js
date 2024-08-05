import express from 'express'
import { addtoCart, deleteUser, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()


router.post("/update/:id",verifyToken,updateUser)
router.delete("/delete/:id",verifyToken,deleteUser)
router.post("/addtocart",verifyToken,addtoCart)

export default router