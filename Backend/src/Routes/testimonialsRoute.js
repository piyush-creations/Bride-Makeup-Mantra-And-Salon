import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// 👉 GET: Fetch all testimonials (newest first)
router.get("/", async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { id: "desc" },
    });
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("TESTIMONIAL FETCH ERROR:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 👉 POST: Add new testimonial
router.post("/", async (req, res) => {
  try {
    const { name, service, text, rating } = req.body;

    if (!name || !text || !rating) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        service: service || "Client",
        text,
        rating: Number(rating),
      },
    });

    // FIX: Return the testimonial directly (not wrapped in { message, testimonial })
    // so the frontend can do setReviews([newTestimonial, ...reviews]) directly
    res.status(201).json(testimonial);
  } catch (error) {
    console.error("TESTIMONIAL ERROR:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;