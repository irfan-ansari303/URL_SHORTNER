import express from "express";
import Url from "../models/url.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const userUrls = await Url.find({});
  return res.render("Home", { urls: userUrls, id: null });
});

export default router;

