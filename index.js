import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import urlRoutes from "./routes/url.js";
import staticRouter from "./routes/staticRouter.js";
import userRoutes from "./routes/user.js";
import Url from "./models/url.js";

dotenv.config();

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Base URL for frontend (Render, localhost, etc.)
const baseUrl = process.env.BASE_URL || process.env.FRONTEND_URL || null;
app.use((req, res, next) => {
  res.locals.baseUrl = baseUrl || `${req.protocol}://${req.get("host")}`;
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/", staticRouter);
app.use("/user", userRoutes);
app.use("/url", urlRoutes);

// Route to handle short URLs
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error("Error in short URL route:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Server started at PORT : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });
