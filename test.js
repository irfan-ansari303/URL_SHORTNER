const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ Connected to MongoDB!"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));