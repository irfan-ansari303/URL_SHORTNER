  const { nanoid } = require("nanoid");
  const Url = require("../models/url");

  // Generate a new short URL
  async function generateNewShortUrl(req, res) {
    try {
      // Accept both `url` and `fullUrl` from form or API
      let longUrl = req.body.url || req.body.fullUrl;
      if (!longUrl) {
        return res.status(400).json({ error: "URL is required" });
      }

      // Ensure URL starts with http:// or https://
      if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
        longUrl = "https://" + longUrl;
      }

      const shortId = nanoid(8);

      await Url.create({
        shortId,
        redirectUrl: longUrl,
        visitHistory: [],
        owner:req.user.id,
      });

      const userUrls = await Url.find({owner:req.user.id}).sort({ createdAt: -1 });

      return res.render("Home", {
        id: shortId,
        urls: userUrls,
      });
    } catch (err) {
      console.error("Error generating short URL:", err);
      res.status(500).send("Server Error");
    }
  }

  // Get analytics for a short URL
  async function handleGetAnalytics(req, res) {
    try {
      const shortId = req.params.shortId;
      const result = await Url.findOne({ shortId });

      if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
      }

      return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
      });
    } catch (err) {
      console.error("Analytics Error:", err);
      res.status(500).send("Server Error");
    }
  }


  async function renderHome(req, res) {
    try {
      const allUrls = await Url.find({ owner: req.user.id }).sort({ createdAt: -1 });
      res.render("Home", { urls: allUrls, id: null });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }

  // Redirect short URL to actual URL
  async function handleRedirect(req, res) {
    try {
      const shortId = req.params.shortId;
      console.log("Redirect request for:", shortId);

      const entry = await Url.findOne({ shortId });
      console.log("DB entry found:", entry);

      if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
      }

      // Track visit
      entry.visitHistory.push({ timestamp: Date.now() });
      await entry.save();

      return res.redirect(entry.redirectUrl);
    } catch (err) {
      console.error("Redirect Error:", err);
      res.status(500).send("Server Error");
    }
  }

  module.exports = {
    generateNewShortUrl,
    handleGetAnalytics,
    handleRedirect,
    renderHome,
  };
