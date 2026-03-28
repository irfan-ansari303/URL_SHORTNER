import express from "express";
import { handleUserSignup, handleUserLogin } from "../controllers/user.js";

const router = express.Router();

// Signup page
router.get("/signup", (req, res) => res.render("signup", { error: null }));
router.post("/signup", handleUserSignup);

// Login page
router.get("/login", (req, res) => res.render("login", { error: null }));
router.post("/login", handleUserLogin);

export default router;

