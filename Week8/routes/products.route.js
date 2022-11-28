import { Router } from "express";
import { AddProduct, GetAllProducts , Delete } from "../controllers/product.controller.js";
import { veriftToken } from "../middlewares/veriftToken.middleware.js";

/* Configure Route */
const router = Router()


/* Add Product Route */
router.post('/',AddProduct);
/* Get Product Route */
router.get('/',veriftToken,GetAllProducts);
/* Delete Product Route */
router.delete('/',Delete);


export default router
