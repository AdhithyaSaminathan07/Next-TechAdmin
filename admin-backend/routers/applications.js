// routers/applications.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const Application = require("../models/Students");

const router = express.Router();

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
router.use("/uploads", express.static(uploadDir));

// ✅ Multer setup (resume + noc only)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ POST Application (create/update)
router.post(
  "/",
  upload.fields([{ name: "resume" }, { name: "noc" }]),
  async (req, res) => {
    try {
      const appData = {
        // SECTION A
        fullName: req.body["Full Name (as per academic records)"] || req.body.fullName,
        dob: req.body["Date of Birth"] || req.body.dob,
        gender: req.body["Gender"] || req.body.gender,
        whatsapp: req.body["Contact Number (with WhatsApp)"] || req.body.whatsapp,
        email: req.body["Email Address"] || req.body.email,
        address: req.body["Residential Address"] || req.body.address,
        city: req.body["City"] || req.body.city,
        pincode: req.body["Pincode"] || req.body.pincode,

        // SECTION B
        level: req.body["Level of Study"] || req.body.level,
        course: req.body["Course"] || req.body.course,
        specialization: req.body["Specialization"] || req.body.specialization,
        college: req.body["College"] || req.body.college,
        year: req.body["Current Year"] || req.body.year,
        rollNo: req.body["Roll No"] || req.body.rollNo,
        academicRequirement:
          req.body["Academic Requirement"] === "Yes" ||
          req.body["academic"] === "Yes" ||
          req.body.academicRequirement === "true",

        // SECTION C
        departments: Array.isArray(req.body["Departments"])
          ? req.body["Departments"]
          : req.body["Departments"]
          ? [req.body["Departments"]]
          : Array.isArray(req.body.departments)
          ? req.body.departments
          : req.body.departments
          ? [req.body.departments]
          : [],
        otherDepartment: req.body["Other Department"] || req.body.otherDepartment,
        mode: req.body["Mode"] || req.body.mode,
        duration:
          req.body.durationOther ||
          req.body["Duration Other"] ||
          req.body["Duration"] ||
          req.body.duration,
        fromDate: req.body["From Date"] || req.body.fromDate,
        toDate: req.body["To Date"] || req.body.toDate,

        // SECTION D
        resume: req.files?.resume ? req.files.resume[0].path : null,
        noc: req.files?.noc ? req.files.noc[0].path : null,
        linkedIn: req.body["LinkedIn"] || req.body.linkedin,

        // SECTION E
        signedOn: req.body["Signed On"] || req.body.signedOn,
      };

      // ✅ Save or update (prevent duplicate emails)
      const application = await Application.findOneAndUpdate(
        { email: appData.email },
        appData,
        { new: true, upsert: true }
      );

      res.status(201).json({ success: true, application });
    } catch (err) {
      console.error("❌ Error saving application:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// ✅ Get all applications
router.get("/", async (req, res) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get single application by email
router.get("/email/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const appData = await Application.findOne({ email });
    if (!appData) return res.status(404).json({ error: "Application not found" });
    res.json(appData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Generate PDF by email
router.get("/email/:email/pdf", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const appData = await Application.findOne({ email });
    if (!appData) return res.status(404).send("Application not found");

    const photoHTML = `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:9pt; text-align:center; padding:4px;">
      Affix Recent Passport Size Photograph
    </div>`;

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 35px; line-height: 1.4; font-size: 10.5pt; color: #111; }
            h1 { text-align: center; color: #047857; font-size: 18pt; margin-bottom: 2px; }
            h3 { text-align: center; margin-top: 0; margin-bottom: 15px; font-size: 11pt; color: #333; }
            h2 { font-size: 12pt; margin-top: 20px; margin-bottom: 8px; padding: 4px; border: 1px solid #047857; background: #f0fdf4; color: #047857; }
            .row { display: flex; margin-bottom: 4px; border-bottom: 1px solid #e5e5e5; padding-bottom: 2px; }
            .label { font-weight: bold; width: 180px; }
            .value { flex: 1; }
            .photo-box { border: 1px dashed #444; width: 110px; height: 140px; margin-left: 30px; }
            .flex-between { display: flex; justify-content: space-between; align-items: flex-start; }
            .signature { margin-top: 30px; }
            .signature-line { display: inline-block; width: 180px; border-bottom: 1px solid #000; margin-left: 10px; }
            .section-e { page-break-inside: avoid; }
          </style>
        </head>
        <body>
          <h1>Tech Vaseegrah</h1>
          <h3>INTERNSHIP ADMISSION APPLICATION FORM</h3>

          <!-- SECTION A -->
          <h2>SECTION A: PERSONAL INFORMATION</h2>
          <div class="flex-between">
            <div style="flex:1;">
              <div class="row"><span class="label">Full Name:</span><span class="value">${appData.fullName || "-"}</span></div>
              <div class="row"><span class="label">Date of Birth:</span><span class="value">${appData.dob || "-"}</span></div>
              <div class="row"><span class="label">Gender:</span><span class="value">${appData.gender || "-"}</span></div>
              <div class="row"><span class="label">WhatsApp:</span><span class="value">${appData.whatsapp || "-"}</span></div>
              <div class="row"><span class="label">Email:</span><span class="value">${appData.email || "-"}</span></div>
              <div class="row"><span class="label">Address:</span><span class="value">${appData.address || "-"}</span></div>
              <div class="row"><span class="label">City:</span><span class="value">${appData.city || "-"}</span></div>
              <div class="row"><span class="label">Pincode:</span><span class="value">${appData.pincode || "-"}</span></div>
            </div>
            <div class="photo-box">${photoHTML}</div>
          </div>

          <!-- SECTION B -->
          <h2>SECTION B: EDUCATIONAL DETAILS</h2>
          <div class="row"><span class="label">Level of Study:</span><span class="value">${appData.level || "-"}</span></div>
          <div class="row"><span class="label">Course:</span><span class="value">${appData.course || "-"}</span></div>
          <div class="row"><span class="label">Specialization:</span><span class="value">${appData.specialization || "-"}</span></div>
          <div class="row"><span class="label">College:</span><span class="value">${appData.college || "-"}</span></div>
          <div class="row"><span class="label">Current Year:</span><span class="value">${appData.year || "-"}</span></div>
          <div class="row"><span class="label">Roll No:</span><span class="value">${appData.rollNo || "-"}</span></div>
          <div class="row"><span class="label">Academic Requirement:</span><span class="value">${appData.academicRequirement ? "Yes" : "No"}</span></div>

          <!-- SECTION C -->
          <h2>SECTION C: INTERNSHIP PREFERENCES</h2>
          <div class="row"><span class="label">Departments:</span><span class="value">${(appData.departments || []).join(", ")}</span></div>
          <div class="row"><span class="label">Other Department:</span><span class="value">${appData.otherDepartment || "-"}</span></div>
          <div class="row"><span class="label">Mode:</span><span class="value">${appData.mode || "-"}</span></div>
          <div class="row"><span class="label">Duration:</span><span class="value">${appData.duration || "-"}</span></div>
          <div class="row"><span class="label">From Date:</span><span class="value">${appData.fromDate || "-"}</span></div>
          <div class="row"><span class="label">To Date:</span><span class="value">${appData.toDate || "-"}</span></div>

          <!-- SECTION D -->
          <h2>SECTION D: SUPPORTING DOCUMENTS</h2>
          <div class="row"><span class="label">Resume:</span><span class="value">${appData.resume ? path.basename(appData.resume) : "-"}</span></div>
          <div class="row"><span class="label">NOC:</span><span class="value">${appData.noc ? path.basename(appData.noc) : "-"}</span></div>
          <div class="row"><span class="label">LinkedIn:</span><span class="value">${appData.linkedIn || "-"}</span></div>

          <!-- SECTION E -->
          <div class="section-e">
            <h2>SECTION E: DECLARATION</h2>
            <p>I hereby declare that the information provided is accurate and complete to the best of my knowledge.</p>
            <div class="signature">
              <span class="label">Applicant Signature:</span><span class="signature-line"></span>
              <span class="label" style="margin-left:30px;">Date:</span> ${appData.signedOn || "-"}
            </div>
          </div>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "25px", bottom: "60px", left: "25px", right: "25px" },
      displayHeaderFooter: true,
      headerTemplate: `<div></div>`,
      footerTemplate: `<div style="font-size:9pt; width:100%; text-align:center; color:#555; padding-bottom:5px;">
        © 2025 Tech Vaseegrah - Internship Application | Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>`,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=Application_${appData.email}.pdf`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error("❌ PDF Error:", err);
    res.status(500).send("Error generating PDF");
  }
});

module.exports = router;
