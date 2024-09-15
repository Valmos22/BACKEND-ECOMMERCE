import { Router } from "express"
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController"

const router = Router();

router.get('/products', getProducts)
router.post('/products', createProduct)
router.get('/products/:id', getProductById)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)


export default router