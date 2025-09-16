const express = require("express");
const Url = require("../models/url");
const router = express.Router();

// GET: Show homepage with all URLs
router.get("/", async (req, res) => {
  const allUrls = await Url.find({});
  return res.render("Home", {
    urls: allUrls,
    id: null, // make sure id is always defined
  });
});

// POST: Handle new URL shorten request
router.post("/shorten", async (req, res) => {
  try {
    const fullUrl = req.body.fullUrl;

    // Create shortId (you can replace with nanoid or shortid library)
    const shortId = Math.random().toString(36).substring(7);

    // Save in DB
    const newUrl = await Url.create({
      redirectUrl: fullUrl,
      shortId: shortId,
    });

    const allUrls = await Url.find({});

    // Render page again with new id + all URLs
    return res.render("Home", {
      urls: allUrls,
      id: newUrl.shortId, // ✅ Now newUrl is defined
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

router.get("/signup",(req,res)=>{
  return res.render("signup");
})

module.exports = router;
