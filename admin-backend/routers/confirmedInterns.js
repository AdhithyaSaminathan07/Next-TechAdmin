// admin-backend/routers/confirmedInterns.js

const express = require("express");
const router = express.Router();

// We need to import BOTH models to move data from one to the other
const Internship = require("../models/ConfirmedInterns"); // Your model for the 'confirmedstudents' collection
const Inhouse = require("../models/Inhouse");           // Your model for the 'inhouses' collection

// This is your existing route to GET all confirmed interns
// It remains unchanged.
router.get("/", async (req, res) => {
  try {
    const confirmedList = await Internship.find();
    res.status(200).json(confirmedList);
  } catch (err) {
    console.error("Error fetching confirmed interns:", err);
    res.status(500).json({ error: "Failed to fetch confirmed interns" });
  }
});


// --- NEW LOGIC FOR THE "ENTRY" BUTTON ---
// This route will be called when you click "Entry"
// It handles moving a student from 'confirmedstudents' to 'inhouses'
router.post("/entry", async (req, res) => {
  try {
    const { id } = req.body; // We will get the student's unique ID from the frontend

    // 1. Find the student in the 'confirmedstudents' collection
    const confirmedStudent = await Internship.findById(id);
    if (!confirmedStudent) {
      return res.status(404).json({ message: "Student not found in confirmed list." });
    }

    // 2. Create a new document for the 'inhouses' collection
    const inhouseStudent = new Inhouse({
      // Map the data from the old model to the new one
      fullName: confirmedStudent.name,
      name: confirmedStudent.name,
      email: confirmedStudent.email,
      phone: confirmedStudent.phone,
      college: confirmedStudent.college,
      department: confirmedStudent.department,
      internshipType: confirmedStudent.internshipType,
      timePeriod: confirmedStudent.timePeriod,
      fromDate: confirmedStudent.fromDate,
      toDate: confirmedStudent.toDate,
    });
    
    // 3. Save the new document into the 'inhouses' collection
    await inhouseStudent.save();

    // 4. Delete the original document from the 'confirmedstudents' collection
    await Internship.findByIdAndDelete(id);

    // 5. Send a success message back to the frontend
    res.status(200).json({ message: "Success! Student has been moved to In-House." });

  } catch (err) {
    console.error("Error moving student to in-house:", err);
    res.status(500).json({ message: "A server error occurred while moving the student." });
  }
});


// --- NEW LOGIC FOR THE "EXIT" BUTTON ---
// This route will be called when you click "Exit"
// It handles updating a student's status to "Exited"
router.post("/exit", async (req, res) => {
  try {
    const { id } = req.body; // Get the unique ID from the frontend

    // Find the student by their ID and update only the 'status' field
    const updatedStudent = await Internship.findByIdAndUpdate(
      id,
      { status: "Exited" }, // Set the new status
      { new: true }        // This option tells mongoose to return the updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student status has been marked as Exited." });
  } catch (err) {
    console.error("Error marking student as exit:", err);
    res.status(500).json({ message: "A server error occurred." });
  }
});


module.exports = router;