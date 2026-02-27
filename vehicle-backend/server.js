import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import vehicleRoutes from "./routes/vehicle.js";
import {rateLimit} from "express-rate-limit";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max : 100
})
app.use(limiter);

app.use("/api/auth", authRoutes)
app.use("/api/vehicles", vehicleRoutes)
