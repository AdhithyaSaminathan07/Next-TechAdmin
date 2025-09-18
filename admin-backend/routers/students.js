// This is the correct code for routers/students.js to COPY data

const express = require("express");
const router = express.Router();
const Student = require("../models/Students");
const ConfirmedIntern = require("../models/ConfirmedInterns");

// GET all students (for the "Applicants" page)
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST to CONFIRM and COPY a student
router.post("/:id/confirm", async (req, res) => {
  try {
    const applicant = await Student.findById(req.params.id);
    if (!applicant) {
      return res.status(404).json({ error: "Applicant not found" });
    }

    // Optional: Check if a confirmed intern with this email already exists
    const alreadyConfirmed = await ConfirmedIntern.findOne({ email: applicant.email });
    if (alreadyConfirmed) {
      // If they exist, just update the original applicant's status
      applicant.status = 'Confirmed';
      await applicant.save();
      return res.status(409).json({ message: "This intern has already been confirmed." });
    }

    // 1. Create a new confirmed intern (this is the copy)
    const newConfirmedIntern = new ConfirmedIntern({
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
      college: applicant.college,
      department: applicant.department,
      internshipType: applicant.internshipType,
      timePeriod: applicant.TimePeriod,
      fromDate: applicant.fromDate,
      toDate: applicant.toDate,
      status: "Confirmed",
    });

    // 2. Save the copy to the 'confirmedstudents' collection
    await newConfirmedIntern.save();
    
    // 3. DO NOT DELETE. Instead, update the original applicant's status.
    // This allows you to see on the "Applicants" page who has been confirmed.
    applicant.status = 'Confirmed';
    const updatedApplicant = await applicant.save();

    res.status(200).json({
      message: "Student copied to Confirmed Interns successfully.",
      student: updatedApplicant, // Send back the updated student
    });
  } catch (err) {
    console.error("Error during confirmation:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE a student (for the "Reject" button)
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;