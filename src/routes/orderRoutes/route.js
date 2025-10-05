import express from "express";

import {
  AllOrders,
  deleteOrder,
  getAllOrdersOfSpecificUser,
  getOrderById,
  placeOrder,
  updateOrderStatus,
} from "../../controllers/orderControllers.js";
import { checkRole, isAuthenticated } from "../../middlewares/authCheck.js";

const router = express.Router();

router.post("/", isAuthenticated, placeOrder);
router.get("/user/:id", isAuthenticated, getAllOrdersOfSpecificUser);
router.get("/:id", isAuthenticated, getOrderById);

//admins
router.get("/", AllOrders);
router.delete("/delete/:id", isAuthenticated, deleteOrder);
router.put(
  "/:id/status",
  isAuthenticated,
  checkRole("ADMIN"),
  updateOrderStatus
);

export default router;
