import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// 🔥 POST: Add Enquiry
router.post("/", async (req, res) => {
  try {
    const { fullName, phone, email, service, date, message } = req.body;

    // Basic validation
    if (!fullName || !phone || !service) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const newEnquiry = await prisma.enquiry.create({
      data: {
        fullName,
        phone,
        email,
        service,
        date,
        message,
      },
    });

    res.status(201).json(newEnquiry);
  } catch (err) {
    console.error("ERROR 👉", err);
    res.status(500).json({ error: err.message });
  }
});


// 🔥 GET: All Enquiries
router.get("/", async (req, res) => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;