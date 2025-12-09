import express from "express"
import { IsAdmin } from "../middlewares/adminPermission.js"
import {
    GetAllProducts,
    GetProductById,
    CreateProduct,
    DeleteProduct
} from "../controllers/product.controller.js"

const router = express.Router();

router.get("/products", GetAllProducts);
router.get("/products/:id", GetProductById);
router.post("/products/create", IsAdmin, CreateProduct);
router.delete("/products/:id", IsAdmin, DeleteProduct);

export default router;