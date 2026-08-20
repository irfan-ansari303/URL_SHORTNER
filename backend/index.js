import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";

import urlRoutes from "./routes/url.js";
import userRoutes from "./routes/user.js";
import Url from "./models/url.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

if (!process.env.MONGO_URL) {
  console.error("❌ Missing MONGO_URL in backend/.env");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("❌ Missing JWT_SECRET in backend/.env");
  process.exit(1);
}

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:3001",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const buildPath = path.join(__dirname, "../frontend/dist");
const hasFrontendBuild = fs.existsSync(path.join(buildPath, "index.html"));

if (hasFrontendBuild) {
  app.use(express.static(buildPath));
}

app.use("/user", userRoutes);
app.use("/url", urlRoutes);

app.get("/:shortId", async (req, res, next) => {
  const reserved = new Set(["user", "url", "static", "api"]);
  if (reserved.has(req.params.shortId)) {
    return next();
  }

  try {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
    );

    if (!entry) {
      return next();
    }

    return res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error("Error in short URL route:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get(/.*/, (req, res) => {
  if (hasFrontendBuild) {
    return res.sendFile(path.join(buildPath, "index.html"));
  }
  return res.status(404).json({
    error: "Frontend build not found. Run npm run build from the project root, or use Vite in development.",
  });
});

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
    console.error("❌ Error connecting to MongoDB:", err.message);
    process.exit(1);
  });
