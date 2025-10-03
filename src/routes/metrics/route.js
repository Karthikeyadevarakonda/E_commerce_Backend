import express from "express";
import { getMetrics } from "../../controllers/metricsControllers.js";
import { checkRole, isAuthenticated } from "../../middlewares/authCheck.js";

const router = express.Router();

router.get("/metrics", isAuthenticated, checkRole("ADMIN"), getMetrics);

export default router;
