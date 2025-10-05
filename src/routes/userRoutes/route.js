import express from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../../controllers/productControllers.js";
import { isAuthenticated } from "../../middlewares/authCheck.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:id", isAuthenticated, updateProductById);
router.delete("/:id", isAuthenticated, deleteProductById);

export default router;
