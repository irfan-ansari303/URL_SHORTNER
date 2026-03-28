import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    if (req.headers.accept?.includes("application/json")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    return res.redirect("/user/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // {id,email}
    next();
  } catch (err) {
    if (req.headers.accept?.includes("application/json")) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    return res.redirect("/user/login");
  }
}
