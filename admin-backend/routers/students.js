// //  routers/students.js

// const express = require("express");
// const router = express.Router();
// const Student = require("../models/Students");
// const ConfirmedIntern = require("../models/ConfirmedInterns");

// // GET all students (for the "Applicants" page)
// router.get("/", async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.status(200).json(students);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST to CONFIRM and COPY a student
// router.post("/:id/confirm", async (req, res) => {
//   try {
//     const applicant = await Student.findById(req.params.id);
//     if (!applicant) {
//       return res.status(404).json({ error: "Applicant not found" });
//     }

//     // Optional: Check if a confirmed intern with this email already exists
//     const alreadyConfirmed = await ConfirmedIntern.findOne({ email: applicant.email });
//     if (alreadyConfirmed) {
//       // If they exist, just update the original applicant's status
//       applicant.status = 'Confirmed';
//       await applicant.save();
//       return res.status(409).json({ message: "This intern has already been confirmed." });
//     }

//     // 1. Create a new confirmed intern (this is the copy)
//     const newConfirmedIntern = new ConfirmedIntern({
//       name: applicant.name,
//       email: applicant.email,
//       phone: applicant.phone,
//       college: applicant.college,
//       department: applicant.department,
//       internshipType: applicant.internshipType,
//       timePeriod: applicant.timePeriod,
//       fromDate: applicant.fromDate,
//       toDate: applicant.toDate,
//       status: "Confirmed",
//     });

//     // 2. Save the copy to the 'confirmedstudents' collection
//     await newConfirmedIntern.save();
    
//     // 3. DO NOT DELETE. Instead, update the original applicant's status.
//     // This allows you to see on the "Applicants" page who has been confirmed.
//     applicant.status = 'Confirmed';
//     const updatedApplicant = await applicant.save();

//     res.status(200).json({
//       message: "Student copied to Confirmed Interns successfully.",
//       student: updatedApplicant, // Send back the updated student
//     });
//   } catch (err) {
//     console.error("Error during confirmation:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE a student (for the "Reject" button)
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedStudent = await Student.findByIdAndDelete(req.params.id);
//     if (!deletedStudent) {
//       return res.status(404).json({ error: "Student not found" });
//     }
//     res.status(200).json({ message: "Student deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// module.exports = router;



const express = require("express");
const router = express.Router();
const axios = require("axios");
const Student = require("../models/Students");
const ConfirmedIntern = require("../models/ConfirmedInterns");

// ==========================
// GET all students/interns
// ==========================
router.get("/", async (req, res) => {
  try {
    const students = await Student.find(); // fetch all students
    res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching internships:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// POST to CONFIRM and COPY a student
// ==========================
router.post("/:id/confirm", async (req, res) => {
  try {
    const applicant = await Student.findById(req.params.id);
    if (!applicant) return res.status(404).json({ error: "Applicant not found" });

    const alreadyConfirmed = await ConfirmedIntern.findOne({ email: applicant.email });
    if (alreadyConfirmed) {
      applicant.status = "Confirmed";
      await applicant.save();
      return res.status(409).json({ message: "This intern has already been confirmed." });
    }

    // 1️⃣ Save to ConfirmedIntern collection
    const newConfirmedIntern = new ConfirmedIntern({
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
      college: applicant.college,
      department: applicant.department,
      internshipType: applicant.internshipType,
      timePeriod: applicant.timePeriod,
      fromDate: applicant.fromDate,
      toDate: applicant.toDate,
      status: "Confirmed",
    });
    await newConfirmedIntern.save();

    // 2️⃣ Update applicant status
    applicant.status = "Confirmed";
    const updatedApplicant = await applicant.save();

    // 3️⃣ WhatsApp Integration
    try {
      const sanitizedPhoneNumber = applicant.phone.replace(/\D/g, '');
      const recipientPhoneNumber = sanitizedPhoneNumber;
      const applicantName = applicant.name.split(" ")[0]; // first name
      const formattedFromDate = new Date(applicant.fromDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedToDate = new Date(applicant.toDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const WHATSAPP_API_URL = `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

      const requestBody = {
        messaging_product: "whatsapp",
        to: recipientPhoneNumber,
        type: "template",
        template: {
          name: "internship_confirmation",
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: applicantName },
                { type: "text", text: formattedFromDate },
                { type: "text", text: formattedToDate },
                { type: "text", text: `https://yourdomain.com/intern/${applicant._id}` }
              ]
            }
          ]
        }
      };

      await axios.post(WHATSAPP_API_URL, requestBody, {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        }
      });

      console.log(`✅ WhatsApp confirmation sent successfully to ${recipientPhoneNumber}`);
    } catch (whatsappError) {
      console.error("🔥 WhatsApp message failed, intern confirmed.");
      console.error("WhatsApp API Error:", whatsappError.response?.data || whatsappError.message);
    }

    res.status(200).json({
      message: "Student confirmed successfully. WhatsApp message initiated.",
      student: updatedApplicant,
    });
  } catch (err) {
    console.error("Error during confirmation:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
