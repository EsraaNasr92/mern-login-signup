import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variable first
dotenv.config();

// Database connection
connectDB()

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/login", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
