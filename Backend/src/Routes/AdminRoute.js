import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Hardcoded admin
const ADMIN = {
  email: "ashakeshri242@gmail.com",
  password: bcrypt.hashSync("Secure@24", 10),
};

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN.email) {
    console.log(`❌ Failed login attempt (wrong email): ${email}`);
    return res.status(400).json({ message: "Invalid email" });
  }

  const isMatch = await bcrypt.compare(password, ADMIN.password);

  if (!isMatch) {
    console.log(`❌ Failed login attempt (wrong password): ${email}`);
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ email }, "secretkey", { expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  console.log(`✅ User logged in: ${email} at ${new Date().toLocaleString()}`);

  res.json({ success: true });
});

// LOGOUT
router.post("/logout", (req, res) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, "secretkey");
      console.log(`🚪 User logged out: ${decoded.email} at ${new Date().toLocaleString()}`);
    } catch (err) {
      console.log("⚠️ Logout attempted with invalid token");
    }
  } else {
    console.log("⚠️ Logout attempted without token");
  }

  res.clearCookie("token", token, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ success: true });
});

// CHECK LOGIN
router.get("/check", (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.json({ loggedIn: false });

  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.json({ loggedIn: false });
    res.json({ loggedIn: true });
  });
});

export default router;