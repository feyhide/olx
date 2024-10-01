import express from 'express'
import { checkAdmin, signin, signOut, signup } from '../controllers/auth.controller.js'

const router = express.Router()

router.post("/signup",signup)
router.post("/signin",signin)
router.get("/signout",signOut)
router.get("/checkadmin",checkAdmin)

export default router