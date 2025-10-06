// models/Homecoming.js

const mongoose = require("mongoose");

const homecomingSchema = new mongoose.Schema(
  {
    // --- Section A: Personal Information ---
    fullName: String,
    dob: String,
    gender: String,
    whatsapp: String,
    email: { type: String, required: true },
    address: String,
    city: String,
    pincode: String,

    // --- Section B: Educational Details ---
    level: String,
    course: String,
    specialization: String,
    college: String,
    year: String,
    rollNo: String,
    academicRequirement: String,

    // --- Section C: Internship Preferences ---
    departments: [String],
    otherDepartment: String,
    mode: String,
    duration: String,
    durationOther: String,
    fromDate: String,
    toDate: String,

    // --- Section D: Supporting Documents ---
    linkedin: String,
    resume: String, // File path
    noc: String, // File path

    // --- Section E: Declaration ---
    signedOn: String,

    // --- Admin/System Fields ---
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Homecoming = mongoose.model("Homecoming", homecomingSchema);

module.exports = Homecoming;