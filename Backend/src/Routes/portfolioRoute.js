import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();


// 🔥 POST: Add Portfolio
router.post("/", async (req, res) => {
  try {
    console.log("BODY 👉", req.body);

    const { image, category } = req.body;

    // ✅ validation
    if (!image) {
      return res.status(400).json({
        error: "Image URL is required",
      });
    }

    // ✅ save in prisma
    const newPortfolio = await prisma.portfolio.create({
      data: {
        image,
        category: category || "general",
      },
    });

    res.status(201).json(newPortfolio);

  } catch (err) {
    console.error("ERROR 👉", err);

    res.status(500).json({
      error: err.message,
    });
  }
});


// 🔥 GET: All Portfolio
router.get("/", async (req, res) => {
  try {
    const data = await prisma.portfolio.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(data);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;