import express from "express";
import verifyAdmin from "../Middlewares/VerifyAdmin.js";

const router = express.Router();

let services = [];

// ADD SERVICE (protected)
router.post("/", verifyAdmin, (req, res) => {
  services.push(req.body);
  res.json({ message: "Service added", services });
});

// GET SERVICES (public)
router.get("/", (req, res) => {
  res.json(services);
});

export default router;