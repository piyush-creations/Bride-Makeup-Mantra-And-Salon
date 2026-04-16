import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import adminRoutes from "./Routes/AdminRoute.js";
import serviceRoutes from "./Routes/ServiceRoute.js";
import portfolioRoutes from "./Routes/portfolioRoute.js";
import enquiryRoutes from "./Routes/enquiryRoute.js";
import testimonialRoutes from "./Routes/testimonialsRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: "https://bridesmakeupmantra.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// 🔥 SERVE IMAGES (IMPORTANT)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/testimonials", testimonialRoutes);

export default app;