import express from "express";

import {
  AllOrders,
  deleteOrder,
  getAllOrdersOfSpecificUser,
  getOrderById,
  placeOrder,
  updateOrderStatus,
} from "../../controllers/orderControllers.js";

const router = express.Router();

router.post("/", placeOrder);
router.get("/user/:id", getAllOrdersOfSpecificUser);
router.get("/:id", getOrderById);

//admins
router.get("/", AllOrders);
router.delete("/delete/:id", deleteOrder);
router.put("/:id/status", updateOrderStatus);

export default router;
