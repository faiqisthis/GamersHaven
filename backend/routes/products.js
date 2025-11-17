import express from "express";
import getAdvancedResults from "../middleware/advancedResults.js";
import Product from "../models/Products.js";
import { authorize,protect } from "../middleware/auth.js";
import { addProduct, getProduct,getProducts,updateProduct,deleteProduct } from "../controllers/products.js";
const router=express.Router();
router.get('/',getAdvancedResults(Product),getProducts)
router.get('/:id',getProduct)
router.post('/',protect,authorize('admin'),addProduct)
router.put('/:id',protect,authorize('admin'),updateProduct)
router.delete('/:id',protect,authorize('admin'),deleteProduct)

export default router