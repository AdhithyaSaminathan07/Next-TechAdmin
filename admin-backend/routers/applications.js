


// // routers/applications.js -- FULLY CORRECTED
// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const puppeteer = require("puppeteer");
// // --- CHANGE 1: Import the new Homecoming model ---
// const Homecoming = require("../models/Homecoming"); // Use the correct model

// const router = express.Router();

// // ✅ Ensure uploads folder exists
// const uploadDir = path.join(__dirname, "..", "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// router.use("/uploads", express.static(uploadDir));

// // ✅ Multer setup (resume + noc only)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });
// const upload = multer({ storage });


// // ✅ POST Application (create/update) -- REVISED AND FIXED
// router.post(
//   "/",
//   upload.fields([{ name: "resume" }, { name: "noc" }]),
//   async (req, res) => {
//     try {
//       const appData = {
//         // SECTION A
//         fullName: req.body["Full Name (as per academic records)"] || req.body.fullName || null,
//         dob: req.body["Date of Birth"] || req.body.dob || null,
//         gender: req.body["Gender"] || req.body.gender || null,
//         whatsapp: req.body["Contact Number (with WhatsApp)"] || req.body.whatsapp || null,
//         email: req.body["Email Address"] || req.body.email || null,
//         address: req.body["Residential Address"] || req.body.address || null,
//         city: req.body["City"] || req.body.city || null,
//         pincode: req.body["Pincode"] || req.body.pincode || null,

//         // SECTION B
//         level: req.body["Level of Study"] || req.body.level || null,
//         course: req.body["Course"] || req.body.course || null,
//         specialization: req.body["Specialization"] || req.body.specialization || null,
//         college: req.body["College"] || req.body.college || null,
//         year: req.body["Current Year"] || req.body.year || null,
//         rollNo: req.body["Roll No"] || req.body.rollNo || null,
//         academicRequirement:
//           req.body["Academic Requirement"] === "Yes" ||
//           req.body.academicRequirement === "true",

//         // SECTION C
//         departments: Array.isArray(req.body["Departments"])
//           ? req.body["Departments"]
//           : req.body["Departments"]
//           ? [req.body["Departments"]]
//           : Array.isArray(req.body.departments)
//           ? req.body.departments
//           : req.body.departments
//           ? [req.body.departments]
//           : [],
//         otherDepartment: req.body["Other Department"] || req.body.otherDepartment || null,
//         mode: req.body["Mode"] || req.body.mode || null,
//         duration:
//           req.body.durationOther ||
//           req.body["Duration Other"] ||
//           req.body["Duration"] ||
//           req.body.duration || null,
//         fromDate: req.body["From Date"] || req.body.fromDate || null,
//         toDate: req.body["To Date"] || req.body.toDate || null,

//         // SECTION D
//         resume: req.files?.resume ? req.files.resume[0].path : (req.body.resume || null),
//         noc: req.files?.noc ? req.files.noc[0].path : (req.body.noc || null),
//         linkedIn: req.body["LinkedIn"] || req.body.linkedin || null,

//         // SECTION E
//         signedOn: req.body["Signed On"] || req.body.signedOn || new Date().toISOString().split('T')[0],
//       };

//       // --- CHANGE 2: Save to the 'homecomings' collection ---
//       const application = await Homecoming.findOneAndUpdate(
//         { email: appData.email },
//         appData,
//         { new: true, upsert: true }
//       );

//       res.status(201).json({ success: true, application });
//     } catch (err) {
//       console.error("❌ Error saving application:", err);
//       res.status(500).json({ error: err.message });
//     }
//   }
// );

// // ✅ Get all applications
// router.get("/", async (req, res) => {
//   try {
//     // --- CHANGE 3: Get from the 'homecomings' collection ---
//     const apps = await Homecoming.find().sort({ createdAt: -1 });
//     res.json(apps);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Get single application by email
// router.get("/email/:email", async (req, res) => {
//   try {
//     const email = decodeURIComponent(req.params.email);
//     // --- CHANGE 4: Get from the 'homecomings' collection ---
//     const appData = await Homecoming.findOne({ email });
//     if (!appData) return res.status(404).json({ error: "Application not found" });
//     res.json(appData);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Generate PDF by mobile number (Final, Robust Version)
// router.get("/mobile/:phone/pdf", async (req, res) => {
//   try {
//     const phoneNumber = decodeURIComponent(req.params.phone);
//     // --- CHANGE 5 (THE MOST IMPORTANT ONE): Get data from the 'homecomings' collection ---
//     const appData = await Homecoming.findOne({
//       $or: [{ whatsApp: phoneNumber }, { phone: phoneNumber }],
//     });
//     if (!appData) {
//       return res.status(404).send("Application not found");
//     }

//     const photoHTML = `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:9pt; text-align:center; padding:4px;">
//       Affix Recent Passport Size Photograph
//     </div>`;

//     const html = `
//       <html>
//         <head>
//           <style>
//             body { font-family: Arial, sans-serif; margin: 35px; line-height: 1.4; font-size: 10.5pt; color: #111; }
//             h1 { text-align: center; color: #047857; font-size: 18pt; margin-bottom: 2px; }
//             h3 { text-align: center; margin-top: 0; margin-bottom: 15px; font-size: 11pt; color: #333; }
//             h2 { font-size: 12pt; margin-top: 20px; margin-bottom: 8px; padding: 4px; border: 1px solid #047857; background: #f0fdf4; color: #047857; }
//             .row { display: flex; margin-bottom: 4px; border-bottom: 1px solid #e5e5e5; padding-bottom: 2px; }
//             .label { font-weight: bold; width: 180px; }
//             .value { flex: 1; }
//             .photo-box { border: 1px dashed #444; width: 110px; height: 140px; margin-left: 30px; }
//             .flex-between { display: flex; justify-content: space-between; align-items: flex-start; }
//             .signature { margin-top: 30px; }
//             .signature-line { display: inline-block; width: 180px; border-bottom: 1px solid #000; margin-left: 10px; }
//             .section-e { page-break-inside: avoid; }
//           </style>
//         </head>
//         <body>
//           <h1>Tech Vaseegrah</h1>
//           <h3>INTERNSHIP ADMISSION APPLICATION FORM</h3>

//           <!-- SECTION A -->
//           <h2>SECTION A: PERSONAL INFORMATION</h2>
//           <div class="flex-between">
//             <div style="flex:1;">
//               <div class="row"><span class="label">Full Name:</span><span class="value">${appData.fullName || "-"}</span></div>
//               <div class="row"><span class="label">Date of Birth:</span><span class="value">${appData.dob || "-"}</span></div>
//               <div class="row"><span class="label">Gender:</span><span class="value">${appData.gender || "-"}</span></div>
//               <div class="row"><span class="label">WhatsApp:</span><span class="value">${appData.whatsapp || "-"}</span></div>
//               <div class="row"><span class="label">Email:</span><span class="value">${appData.email || "-"}</span></div>
//               <div class="row"><span class="label">Address:</span><span class="value">${appData.address || "-"}</span></div>
//               <div class="row"><span class="label">City:</span><span class="value">${appData.city || "-"}</span></div>
//               <div class="row"><span class="label">Pincode:</span><span class="value">${appData.pincode || "-"}</span></div>
//             </div>
//             <div class="photo-box">${photoHTML}</div>
//           </div>

//           <!-- SECTION B -->
//           <h2>SECTION B: EDUCATIONAL DETAILS</h2>
//           <div class="row"><span class="label">Level of Study:</span><span class="value">${appData.level || "-"}</span></div>
//           <div class="row"><span class="label">Course:</span><span class="value">${appData.course || "-"}</span></div>
//           <div class="row"><span class="label">Specialization:</span><span class="value">${appData.specialization || "-"}</span></div>
//           <div class="row"><span class="label">College:</span><span class="value">${appData.college || "-"}</span></div>
//           <div class="row"><span class="label">Current Year:</span><span class="value">${appData.year || "-"}</span></div>
//           <div class="row"><span class="label">Roll No:</span><span class="value">${appData.rollNo || "-"}</span></div>
//           <div class="row"><span class="label">Academic Requirement:</span><span class="value">${appData.academicRequirement ? "Yes" : "No"}</span></div>

//           <!-- SECTION C -->
//           <h2>SECTION C: INTERNSHIP PREFERENCES</h2>
//           <div class="row"><span class="label">Departments:</span><span class="value">${(appData.departments || []).join(", ")}</span></div>
//           <div class="row"><span class="label">Other Department:</span><span class="value">${appData.otherDepartment || "-"}</span></div>
//           <div class="row"><span class="label">Mode:</span><span class="value">${appData.mode || "-"}</span></div>
//           <div class="row"><span class="label">Duration:</span><span class="value">${appData.duration || "-"}</span></div>
//           <div class="row"><span class="label">From Date:</span><span class="value">${appData.fromDate || "-"}</span></div>
//           <div class="row"><span class="label">To Date:</span><span class="value">${appData.toDate || "-"}</span></div>

//           <!-- SECTION D -->
//           <h2>SECTION D: SUPPORTING DOCUMENTS</h2>
//           <div class="row"><span class="label">Resume:</span><span class="value">${appData.resume ? path.basename(appData.resume) : "-"}</span></div>
//           <div class="row"><span class="label">NOC:</span><span class="value">${appData.noc ? path.basename(appData.noc) : "-"}</span></div>
//           <div class="row"><span class="label">LinkedIn:</span><span class="value">${appData.linkedIn || "-"}</span></div>

//           <!-- SECTION E -->
//           <div class="section-e">
//             <h2>SECTION E: DECLARATION</h2>
//             <p>I hereby declare that the information provided is accurate and complete to the best of my knowledge.</p>
//             <div class="signature">
//               <span class="label">Applicant Signature:</span><span class="signature-line"></span>
//               <span class="label" style="margin-left:30px;">Date:</span> ${appData.signedOn || "-"}
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });
//     const page = await browser.newPage();
//     await page.setContent(html, { waitUntil: "networkidle0" });

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       margin: { top: "25px", bottom: "60px", left: "25px", right: "25px" },
//       displayHeaderFooter: true,
//       headerTemplate: `<div></div>`,
//       footerTemplate: `<div style="font-size:9pt; width:100%; text-align:center; color:#555; padding-bottom:5px;">
//         © 2025 Tech Vaseegrah - Internship Application | Page <span class="pageNumber"></span> of <span class="totalPages"></span>
//       </div>`,
//     });

//     await browser.close();

//     res.set({
//       "Content-Type": "application/pdf",
//       "Content-Disposition": `inline; filename=Application_${appData.whatsapp}.pdf`,
//     });
//     res.send(pdfBuffer);
//   } catch (err) {
//     console.error("❌ PDF Error:", err);
//     res.status(500).send("Error generating PDF");
//   }
// });

// module.exports = router;

// routers/applications.js -- CORRECTED & REFINED

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const Homecoming = require("../models/Homecoming");

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Use a unique filename
});
const upload = multer({ storage });

// POST / - Create or update an application
router.post(
  "/",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "noc", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // RECOMMENDATION: This assumes the frontend sends a clean, consistent payload.
      const appData = {
        ...req.body,
        departments: Array.isArray(req.body.departments) ? req.body.departments : [],
        // RECOMMENDATION: Store only the filename, not the full path.
        resume: req.files?.resume ? req.files.resume[0].filename : req.body.resume,
        noc: req.files?.noc ? req.files.noc[0].filename : req.body.noc,
        signedOn: req.body.signedOn || new Date().toISOString().split("T")[0],
      };

      if (!appData.email) {
        return res.status(400).json({ error: "Email is a required field." });
      }

      const application = await Homecoming.findOneAndUpdate(
        { email: appData.email },
        appData,
        { new: true, upsert: true, runValidators: true }
      );

      res.status(201).json({ success: true, application });
    } catch (err) {
      console.error("❌ Error saving application:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// GET / - Get all applications
router.get("/", async (req, res) => {
  try {
    const apps = await Homecoming.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /mobile/:phone/pdf - Generate PDF by WhatsApp number
router.get("/mobile/:phone/pdf", async (req, res) => {
  try {
    const phoneNumber = decodeURIComponent(req.params.phone);

    // ✅ CRITICAL FIX: Use the correct schema field 'whatsapp' (lowercase)
    const appData = await Homecoming.findOne({ whatsapp: phoneNumber });

    if (!appData) {
      return res.status(404).send("<h2>Application Not Found</h2><p>No application was found associated with that mobile number.</p>");
    }

    // (The rest of your excellent PDF generation HTML and Puppeteer logic remains the same)
    const photoHTML = `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:9pt; text-align:center; padding:4px;">Affix Recent Passport Size Photograph</div>`;
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
          <h2>SECTION B: EDUCATIONAL DETAILS</h2>
          <div class="row"><span class="label">Level of Study:</span><span class="value">${appData.level || "-"}</span></div>
          <div class="row"><span class="label">Course:</span><span class="value">${appData.course || "-"}</span></div>
          <div class="row"><span class="label">Specialization:</span><span class="value">${appData.specialization || "-"}</span></div>
          <div class="row"><span class="label">College:</span><span class="value">${appData.college || "-"}</span></div>
          <div class="row"><span class="label">Current Year:</span><span class="value">${appData.year || "-"}</span></div>
          <div class="row"><span class="label">Roll No:</span><span class="value">${appData.rollNo || "-"}</span></div>
          <div class="row"><span class="label">Academic Requirement:</span><span class="value">${appData.academicRequirement ? "Yes" : "No"}</span></div>
          <h2>SECTION C: INTERNSHIP PREFERENCES</h2>
          <div class="row"><span class="label">Departments:</span><span class="value">${(appData.departments || []).join(", ")}</span></div>
          <div class="row"><span class="label">Other Department:</span><span class="value">${appData.otherDepartment || "-"}</span></div>
          <div class="row"><span class="label">Mode:</span><span class="value">${appData.mode || "-"}</span></div>
          <div class="row"><span class="label">Duration:</span><span class="value">${appData.duration || "-"}</span></div>
          <div class="row"><span class="label">From Date:</span><span class="value">${appData.fromDate || "-"}</span></div>
          <div class="row"><span class="label">To Date:</span><span class="value">${appData.toDate || "-"}</span></div>
          <h2>SECTION D: SUPPORTING DOCUMENTS</h2>
          <div class="row"><span class="label">Resume:</span><span class="value">${appData.resume ? appData.resume : "-"}</span></div>
          <div class="row"><span class="label">NOC:</span><span class="value">${appData.noc ? appData.noc : "-"}</span></div>
          <div class="row"><span class="label">LinkedIn:</span><span class="value">${appData.linkedin || "-"}</span></div>
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
      footerTemplate: `<div style="font-size:9pt; width:100%; text-align:center; color:#555; padding-bottom:5px;">© 2025 Tech Vaseegrah - Internship Application | Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=Application_${appData.whatsapp}.pdf`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error("❌ PDF Error:", err);
    res.status(500).send("Error generating PDF");
  }
});


module.exports = router;