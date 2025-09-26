import express from "express";
import { getMetrics } from "../../controllers/metricsControllers.js";

const router = express.Router();

router.get("/metrics", getMetrics);

export default router;
