import express from 'express'
import { addProduct, deleteProduct, getProducts, searchProducts, updateProduct } from '../controllers/product.controller.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

router.post("/addproduct",verifyAdmin,addProduct)
router.get("/getproducts",getProducts)
router.delete("/deleteproduct/:id",verifyAdmin,deleteProduct)
router.patch("/updateproduct/:id",verifyAdmin,updateProduct)
router.get("/search",searchProducts)

export default router