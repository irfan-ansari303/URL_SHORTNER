import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import urlRoutes from "./routes/url.js";
import staticRouter from "./routes/staticRouter.js";
import userRoutes from "./routes/user.js";
import Url from "./models/url.js";

dotenv.config();

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:3001"], 
  credentials: true,
}));


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

// ✅ Serve static files from React build
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

// Routes
app.use("/user", userRoutes);
app.use("/url", urlRoutes);
app.use("/", staticRouter);

// Route to handle short URLs (Dynamic)
app.get("/:shortId", async (req, res, next) => {
  // Ignore routes starting with user or url to prevent overlaps
  if (req.params.shortId === 'user' || req.params.shortId === 'url' || req.params.shortId === 'static') {
    return next();
  }

  try {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) {
      return next(); // Pass to catch-all (which serves React app)
    }

    return res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error("Error in short URL route:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Catch-all route to serve React app for frontend routing (must be LAST)
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
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
