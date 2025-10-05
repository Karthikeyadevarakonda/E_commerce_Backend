import express from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../../controllers/productControllers.js";
import { checkRole, isAuthenticated } from "../../middlewares/authCheck.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", isAuthenticated, checkRole("ADMIN"), addProduct);
router.put("/:id", isAuthenticated, checkRole("ADMIN"), updateProductById);
router.delete("/:id", isAuthenticated, checkRole("ADMIN"), deleteProductById);

export default router;
