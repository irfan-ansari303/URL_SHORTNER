const express = require("express");
const Url = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await Url.find({});
  return res.render("Home", { urls: allUrls, id: null });
});

module.exports = router;
