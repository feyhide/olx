import express from 'express'
import { addProduct, deleteProduct, getProduct, getProducts, searchProducts, updateProduct } from '../controllers/product.controller.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'
import { deleteCachedData, getCachedData } from '../utils/redis.js'
import { addcatagory, deletecatagory, getcatagories, updatecatagory } from '../controllers/catagories.controller.js'

const router = express.Router()

router.post("/addproduct",verifyAdmin,deleteCachedData("products"),addProduct)
router.get("/getproducts",getCachedData("products"),getProducts)
router.get("/getproduct/:id",getProduct)
router.delete("/deleteproduct/:id",verifyAdmin,deleteCachedData("products"),deleteProduct)
router.patch("/updateproduct/:id",verifyAdmin,deleteCachedData("products"),updateProduct)

router.get("/search",searchProducts)

router.post("/addcatagory",verifyAdmin,deleteCachedData("catagories"),addcatagory)
router.patch("/updatecatagory/:id",verifyAdmin,deleteCachedData("catagories"),updatecatagory)
router.delete("/updatecatagory/:id",verifyAdmin,deleteCachedData("catagories"),deletecatagory)
router.get("/getcatagories",getCachedData("catagories"),getcatagories)

export default router