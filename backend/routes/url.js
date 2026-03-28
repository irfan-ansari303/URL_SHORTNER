import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { generateNewShortUrl, handleGetAnalytics, handleRedirect, renderHome } from "../controllers/url.js";

const router = express.Router();

router.use(authMiddleware)

// Home page
router.get("/", renderHome);

// Generate new short URL
router.post("/", generateNewShortUrl);

// Get analytics
router.get("/analytics/:shortId", handleGetAnalytics);

// Redirect short URL
router.get("/:shortId", handleRedirect);

export default router;

