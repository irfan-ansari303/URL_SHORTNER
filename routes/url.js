const express = require("express");
const router = express.Router();
const authMiddleware=require("../middleware/authMiddleware");

const { generateNewShortUrl, handleGetAnalytics, handleRedirect, renderHome } = require("../controllers/url");


router.use(authMiddleware)

// Home page

router.get("/",renderHome);

// Generate new short URL
router.post("/", generateNewShortUrl);

// Get analytics
router.get("/analytics/:shortId", handleGetAnalytics);

// Redirect short URL
router.get("/:shortId", handleRedirect);

module.exports = router;
