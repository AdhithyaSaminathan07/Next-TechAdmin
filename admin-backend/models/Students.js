// models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    // These fields are based on your database screenshot, not your previous schema
    name: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    college: String,
    department: String,
    internshipType: String,
    TimePeriod: String, // Added this field from your screenshot
    fromDate: String,
    toDate: String,
    timestamp: String, // Added this field from your screenshot

    // ===== NEW FIELD TO TRACK CONFIRMATIONS =====
    status: {
      type: String,
      enum: ["Pending", "Confirmed"], // The status can only be one of these two values
      default: "Pending",             // New applicants will automatically have the "Pending" status
    },
  },
  {
    timestamps: true, // `timestamps: true` will add `createdAt` and `updatedAt` fields
    collection: "students",
  }
);

module.exports = mongoose.model("Student", studentSchema);