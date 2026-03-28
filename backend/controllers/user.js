import User from "../models/user.js";
import Url from "../models/url.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Handle user signup
export async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      if (req.headers.accept?.includes("application/json")) {
        return res.status(400).json({ error: "All fields are required" });
      }
      return res.render("signup", { error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (req.headers.accept?.includes("application/json")) {
        return res.status(400).json({ error: "Email already exists" });
      }
      return res.render("signup", { error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });

    const userUrls = await Url.find({ owner: user._id });

    if (req.headers.accept?.includes("application/json")) {
      return res.status(201).json({ message: "Signup successful", urls: userUrls });
    }

    return res.render("Home", {
      urls: userUrls,
      id: null,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).send("Server Error");
  }
}

// Handle user login
export async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      if (req.headers.accept?.includes("application/json")) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      return res.render("login", { error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      if (req.headers.accept?.includes("application/json")) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      return res.render("login", { error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });

    const userUrls = await Url.find({ owner: user._id });

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ message: "Login successful", urls: userUrls });
    }

    return res.render("Home", {
      urls: userUrls,
      id: null,
    }); // Login success
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).send("Server Error");
  }
}


