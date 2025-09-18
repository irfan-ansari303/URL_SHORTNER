const express = require("express");
require("dotenv").config();
const cookieParser=require("cookie-parser")
const mongoose = require("mongoose");
const path = require("path");

const urlRoutes = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRoutes = require("./routes/user");

const app = express();
// after dotenv.config() and before routes
const baseUrl = process.env.BASE_URL || process.env.FRONTEND_URL || null;

app.use((req, res, next) => {
  // compute a fallback base URL from request when env var is not set
  res.locals.baseUrl = baseUrl || `${req.protocol}://${req.get("host")}`;
  next();
});





// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


// Routes
app.use("/", staticRouter);
app.use("/user", userRoutes);
app.use("/url", urlRoutes);

// Route to handle short URLs
const Url = require("./models/url");
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
     
    const PORT=process.env.PORT || 8000
    app.listen(PORT, () => {
      console.log(`🚀 Server started at PORT : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });
