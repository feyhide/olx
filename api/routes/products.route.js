import express from 'express'
import { addProduct, deleteProduct, getProducts, searchProducts, updateProduct } from '../controllers/product.controller.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'
import { deleteCachedData, getCachedData } from '../utils/redis.js'

const router = express.Router()

router.post("/addproduct",verifyAdmin,deleteCachedData("products"),addProduct)
router.get("/getproducts",getCachedData("products"),getProducts)
router.delete("/deleteproduct/:id",verifyAdmin,deleteCachedData("products"),deleteProduct)
router.patch("/updateproduct/:id",verifyAdmin,deleteCachedData("products"),updateProduct)
router.get("/search",searchProducts)

export default router