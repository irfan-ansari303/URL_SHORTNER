const express = require("express");
const Url = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  const userUrls = await Url.find({});
  return res.render("Home", { urls: userUrls, id: null });
});

module.exports = router;
