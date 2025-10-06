// routers/homecoming.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const Homecoming = require("../models/Homecoming"); // Import the new model

const router = express.Router();

// --- File Uploads Setup ---
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// --- API ROUTES ---

// --- Create Application ---
router.post(
  "/applications",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "noc", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const appData = {
        ...req.body,
        resume: req.files?.resume ? req.files.resume[0].filename : null,
        noc: req.files?.noc ? req.files.noc[0].filename : null,
      };

      const application = new Homecoming(appData);
      await application.save();
      res.status(201).json({ message: "Application submitted successfully!", data: application });
    } catch (err) {
      console.error("Error creating application:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// --- Get All Applications ---
router.get("/applications", async (req, res) => {
    // ... (GET all applications logic)
});

// --- Get Single Application by ID ---
router.get("/applications/:id", async (req, res) => {
    // ... (GET single application logic)
});

// --- Update Application Status ---
router.put("/applications/:id/status", async (req, res) => {
    // ... (PUT application status logic)
});

// --- PDF Generation ---
router.get("/applications/:id/pdf", async (req, res) => {
    // ... (PDF generation logic)
});

module.exports = router;