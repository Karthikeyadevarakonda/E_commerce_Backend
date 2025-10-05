import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import productRoutes from "./routes/userRoutes/route.js";
import orderRoutes from "./routes/orderRoutes/route.js";
import metricRoutes from "./routes/metrics/route.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://trendcartecomin.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy does not allow access from this origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api/allProducts", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", metricRoutes);

const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
  console.log(`YOUR APP RUNNING ON PORT : http://localhost:${PORT}`);
});
