const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  college: String,
  department: String,
  internshipType: String,
  TimePeriod: String,
  fromDate: String,
  toDate: String,
  status: { type: String, default: "Pending" }
}, { timestamps: true, collection: "students" });

module.exports = mongoose.model("Internship", internshipSchema);
