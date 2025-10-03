import { createServer } from "http";
import { parse } from "url";
import prisma from "../src/lib/prisma.js";

// api/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import your route modules
import authRoutes from "../src/routes/authroutes.js";
import productRoutes from "../src/routes/userRoutes/route.js";
import orderRoutes from "../src/routes/orderRoutes/route.js";
import metricRoutes from "../src/routes/metrics/route.js";

dotenv.config();
const app = express();

// Enable CORS (adjust the origin if needed)
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());

// Mount routes
app.use("/auth", authRoutes);
app.use("/allProducts", productRoutes);
app.use("/orders", orderRoutes);
app.use("/admin", metricRoutes);

// Root route (optional)
app.get("/", (req, res) => {
  res.send("TrendCart API is running 🚀");
});

// **Important for Vercel:** Do NOT use app.listen()
// Export the Express app so Vercel can handle requests
export default app;
