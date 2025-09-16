const express = require("express");
const router = express.Router();
const Internship = require("../models/internship");
const Inhouse = require("../models/Inhouse");

// Register Student
router.post("/register", async (req, res) => {
  try {
    const student = new Internship(req.body);
    await student.save();
    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Students
router.get("/students", async (req, res) => {
  try {
    const students = await Internship.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Confirm Student
router.post("/confirm-student", async (req, res) => {
  try {
    const { email } = req.body;
    const updated = await Internship.findOneAndUpdate(
      { email },
      { status: "Confirmed" },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student confirmed", student: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Only Confirmed Students
router.get("/confirmed", async (req, res) => {
  try {
    const confirmedStudents = await Internship.find({ status: "Confirmed" });
    res.status(200).json(confirmedStudents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Entry - Move to Inhouse with status Entry
router.post("/entry", async (req, res) => {
  try {
    const { email } = req.body;

    // Find student in Internship
    const student = await Internship.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if already in Inhouse
    const exists = await Inhouse.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Student already in Inhouse" });
    }

    // Copy student data with status Entry
    const newInhouse = new Inhouse({
      ...student.toObject(),
      status: "Entry"
    });

    await newInhouse.save();

    res.status(200).json({
      message: "Moved to Inhouse Application with Entry status",
      data: newInhouse
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exit - Update status to Exit
router.post("/exit", async (req, res) => {
  try {
    const { email } = req.body;

    const updated = await Inhouse.findOneAndUpdate(
      { email: email.trim() },
      { status: "Exit" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Student not found in Inhouse" });
    }

    res.status(200).json({ message: "Marked as Exit", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Inhouse students
router.get("/inhouse", async (req, res) => {
  try {
    const inhouseStudents = await Inhouse.find();
    res.status(200).json(inhouseStudents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
