// // server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// // ===== Import Routes =====
// const internshipRoutes = require("./routers/students");
// const applicationRoutes = require("./routers/applications"); // renamed inhouse -> applications
// const sendFormLinkRoute = require("./routers/sendFormLink");
// const statsRouter = require("./routers/stats"); // Moved this from the bottom for better organization

// // 1. ADD THIS LINE: Import the new router for confirmed interns.
// // Make sure you have created the 'confirmedInterns.js' file in your 'routers' folder.
// const confirmedInternsRouter = require("./routers/confirmedInterns");


// const app = express();

// // ===== Middleware =====
// app.use(cors({ origin: "*" })); 
// app.use(express.json()); 
// app.use(express.urlencoded({ extended: true })); 

// // ===== Static Files =====
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ===== MongoDB Connection =====
// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/internshipDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // ===== API Routes =====
// app.use("/api/internships", internshipRoutes);     
// app.use("/api/applications", applicationRoutes);
// app.use("/api/send-form-link", sendFormLinkRoute); 
// app.use("/api/stats", statsRouter);

// // 2. ADD THIS LINE: Tell the app to use the new router.
// // This creates the URL: http://localhost:5001/api/confirmed-interns
// app.use("/api/confirmed-interns", confirmedInternsRouter);


// // ===== Health Check =====
// app.get("/", (req, res) => {
//   res.json({ status: "🚀 Server is running" });
// });

// // ===== Global Error Handler =====
// app.use((err, req, res, next) => {
//   console.error("🔥 Server Error:", err);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// // ===== Start Server =====
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });



// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ===== Import Routes =====
const internshipRoutes = require("./routers/students");
const applicationRoutes = require("./routers/applications");
const sendFormLinkRoute = require("./routers/sendFormLink");
const statsRouter = require("./routers/stats");
const confirmedInternsRouter = require("./routers/confirmedInterns");

// ==========================================================
// FIX - STEP 1: Import the inhouse router from its file.
const inhouseRouter = require("./routers/inhouse");
// ==========================================================


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
app.use("/api/applications", applicationRoutes);
app.use("/api/send-form-link", sendFormLinkRoute); 
app.use("/api/stats", statsRouter);
app.use("/api/confirmed-interns", confirmedInternsRouter);

// ==========================================================
// FIX - STEP 2: Tell Express to use the inhouseRouter when it sees the URL "/api/inhouse".
app.use("/api/inhouse", inhouseRouter);
// ==========================================================


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