const express = require("express");
const router = express.Router();

const Application = require("../models/Students");
const ConfirmedIntern = require("../models/ConfirmedInterns"); // ✅ clearer name
const Inhouse = require("../models/Inhouse");

// API: /api/stats
router.get("/", async (req, res) => {
  try {
    const applicantsCount = await Application.countDocuments();
    const confirmedCount = await ConfirmedIntern.countDocuments(); // ✅ fixed
    const inhouseCount = await Inhouse.countDocuments();

    res.json({
      applicants: applicantsCount,
      confirmed: confirmedCount,  // ✅ renamed field
      inhouse: inhouseCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

module.exports = router;
