import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import productRoutes from "./routes/userRoutes/route.js";
import orderRoutes from "./routes/orderRoutes/route.js";
import metricRoutes from "./routes/metrics/route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api/allProducts", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", metricRoutes);

const PORT = process.env.PORT || 7002;

app.get("/", (_, res) => {
  res.send("HELLO WORLD");
});

app.listen(PORT, () => {
  console.log(`YOUR APP RUNNING ON PORT : http://localhost:${PORT}`);
});
