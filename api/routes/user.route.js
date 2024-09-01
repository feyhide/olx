import express from 'express'
import {deleteUser, getUser, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyToken.js'
import { deleteCachedUser, getCachedUser } from '../utils/redis.js'

const router = express.Router()

router.get("/profile/:id",verifyToken,getCachedUser("profile"),getUser)
router.post("/update/:id",verifyToken,deleteCachedUser("profile"),updateUser)
router.delete("/delete/:id",verifyToken,deleteCachedUser("profile"),deleteUser)



export default router