import { Router } from "express";
import { createProduct, getProducts, getProductById, putProductById, deleteProductById} from "./handlers/product";
const router = Router()

router.get('/', getProducts)

router.get('/:id', getProductById)

router.post('/', createProduct)

router.put('/:id', putProductById)

router.delete('/:id', deleteProductById)

export default router