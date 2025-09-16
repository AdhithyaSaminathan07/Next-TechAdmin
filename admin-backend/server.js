// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ===== Import Routes =====
const internshipRoutes = require("./routers/internships");
const applicationRoutes = require("./routers/applications"); // renamed inhouse -> applications
const sendFormLinkRoute = require("./routers/sendFormLink");

const app = express();

// ===== Middleware =====
app.use(cors({ origin: "*" })); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// ===== Static Files =====
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== MongoDB Connection =====
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/internshipDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ===== API Routes =====
app.use("/api/internships", internshipRoutes);     
app.use("/api/applications", applicationRoutes);   // 👈 now ONLY applications
app.use("/api/send-form-link", sendFormLinkRoute); 

// ===== Health Check =====
app.get("/", (req, res) => {
  res.json({ status: "🚀 Server is running" });
});

// ===== Global Error Handler =====
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ===== Start Server =====
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
