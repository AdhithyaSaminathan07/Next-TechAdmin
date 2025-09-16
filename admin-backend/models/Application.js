const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    fullName: String,
    dob: String,
    gender: String,
    whatsapp: String,
    email: { type: String, required: true, unique: true },
    address: String,
    city: String,
    pincode: String,
    level: String,
    course: String,
    specialization: String,
    college: String,
    year: String,
    rollNo: String,
    academicRequirement: Boolean,
    departments: [String],
    otherDepartment: String,
    mode: String,
    duration: String,
    fromDate: String,
    toDate: String,
    resume: String,
    noc: String,
    linkedIn: String,
    signedOn: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true, collection: "applications" }
);

module.exports = mongoose.model("Application", applicationSchema);
