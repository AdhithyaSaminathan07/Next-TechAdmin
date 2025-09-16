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




// models/Inhouse.js
const mongoose = require("mongoose");

const inhouseSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true }, // ✅ enforce unique
  phone: String,
  college: String,
  department: String,
  fromDate: String,
  toDate: String,
  status: { type: String, default: "Entry" },
  files: [String],
  resumePath: String,
  bonafidePath: String,
  pdfPath: String,
  submittedAt: { type: Date, default: Date.now }
});

// Explicit collection name (keeps old records intact)
module.exports = mongoose.model("Inhouse", inhouseSchema, "inhouses");


// // models/Inhouse.js
// const mongoose = require("mongoose");

// const inhouseSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },  // ensure email is unique
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

// // ✅ Use "applications" because that's your real collection name
// module.exports = mongoose.model("Inhouse", inhouseSchema, "applications");
