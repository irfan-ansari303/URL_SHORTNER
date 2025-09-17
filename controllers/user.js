const User = require("../models/user");
const Url = require("../models/url"); // Must import Url if used
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Handle user signup
async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.render("signup", { error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user= await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });


    const userUrls = await Url.find({owner:user._id});

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
async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.render("login", { error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render("login", { error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });

     const userUrls=await Url.find({owner:user._id});
    return res.render("Home",{
      urls:userUrls,
      id:null,
    }); // Login success
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).send("Server Error");
  }
}

// Export functions as object
module.exports = { handleUserSignup, handleUserLogin };
