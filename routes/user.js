const express = require("express");
const router = express.Router();
const {
  handleUserSignup,
  handleUserLogin,
} = require("../controllers/user");

// Signup page
router.get("/signup", (req, res) => res.render("signup", { error: null }));
router.post("/signup", handleUserSignup);

// Login page
router.get("/login", (req, res) => res.render("login", { error: null }));
router.post("/login", handleUserLogin);

module.exports = router;
