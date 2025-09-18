// modles/Confirmedinterns.js

const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    college: String,
    department: String,
    internshipType: String,
    timePeriod: String, // camelCase consistent
    fromDate: String,
    toDate: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true, collection: "confirmedstudents" }
);

module.exports = mongoose.model("Internship", internshipSchema, "confirmedstudents");
