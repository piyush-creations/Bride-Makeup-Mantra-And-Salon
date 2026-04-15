import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ✅ MULTER CONFIG
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 🔥 POST: Add Portfolio (NO AUTH for now)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("FILE 👉", req.file);
    console.log("BODY 👉", req.body);

    // ❌ If image missing
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const newPortfolio = await prisma.portfolio.create({
      data: {
        image: imagePath,
        category: req.body.category || "general",
      },
    });

    res.status(201).json(newPortfolio);
  } catch (err) {
    console.error("ERROR 👉", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔥 GET: All Portfolio
router.get("/", async (req, res) => {
  try {
    const data = await prisma.portfolio.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;