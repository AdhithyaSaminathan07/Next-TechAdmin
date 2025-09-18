// // models/Inhouse.js
// const mongoose = require("mongoose");

// const inhouseSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   college: String,
//   department: String,
//   fromDate: String,
//   toDate: String,
//   status: { type: String, default: "Entry" },
//   files: [String],
//   resumePath: String,
//   bonafidePath: String,
//   pdfPath: String,
//   submittedAt: { type: Date, default: Date.now }
// });

// // Use explicit collection name to stay compatible with existing DB
// module.exports = mongoose.model("Inhouse", inhouseSchema, "inhouses");




// // models/Inhouse.js
// const mongoose = require("mongoose");

// const inhouseSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, required: true, unique: true }, // ✅ enforce unique
//   phone: String,
//   college: String,
//   department: String,
//   fromDate: String,
//   toDate: String,
//   status: { type: String, default: "Entry" },
//   files: [String],
//   resumePath: String,
//   bonafidePath: String,
//   pdfPath: String,
//   submittedAt: { type: Date, default: Date.now }
// });

// // Explicit collection name (keeps old records intact)
// module.exports = mongoose.model("Inhouse", inhouseSchema, "inhouses");

const mongoose = require("mongoose");

const inhouseSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true }, // can also keep "name" if needed
    name: String, // keep original if some documents only have name
    email: { type: String, required: true, unique: true },
    phone: String,
    college: String,
    department: String,
    internshipType: String,   // for internship info
    timePeriod: String,       // renamed from TimePeriod to camelCase
    fromDate: String,
    toDate: String,
    dob: String,
    gender: String,
    whatsapp: String,
    address: String,
    pincode: String,
    level: String,
    course: String,
    specialization: String,
    year: String,
    rollNo: String,
    academicRequirement: { type: Boolean, default: false },
    departments: { type: [String], default: [] },
    otherDepartment: String,
    mode: String,
    duration: String,
    resume: String,
    noc: String,
    linkedIn: String,
    signedOn: String,
    files: { type: [String], default: [] },
    resumePath: String,
    bonafidePath: String,
    pdfPath: String,
    status: { type: String, default: "Entry" },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "inhouses" }
);

module.exports = mongoose.model("Inhouse", inhouseSchema, "inhouses");
