// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const PDFDocument = require("pdfkit");
// const Inhouse = require("../models/Inhouse");

// // Ensure uploads folder exists
// const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads");
// if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// // Multer config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, UPLOAD_DIR);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname.replace(/\s+/g, "_"));
//   }
// });
// const upload = multer({ storage });

// // POST /api/inhouse
// router.post("/", upload.any(), async (req, res) => {
//   try {
//     const data = req.body || {};
//     const files = (req.files || []).map(f => ({ fieldname: f.fieldname, originalname: f.originalname, path: path.relative(path.join(__dirname, "..", ".."), f.path) }));

//     // Build document
//     const newEntry = new Inhouse({
//       ...data,
//       files: files.map(f => f.path),
//       resumePath: files.find(f=>f.fieldname==='resume')?.path || "",
//       bonafidePath: files.find(f=>f.fieldname==='bonafide')?.path || ""
//     });

//     await newEntry.save();

//     // Generate a simple PDF summary
//     const pdfName = Date.now() + "_inhouse.pdf";
//     const pdfPathFull = path.join(UPLOAD_DIR, pdfName);
//     const pdfPathRelative = path.join("uploads", pdfName);

//     const doc = new PDFDocument();
//     const stream = fs.createWriteStream(pdfPathFull);
//     doc.pipe(stream);

//     doc.fontSize(18).text("Inhouse Application", { align: "center" });
//     doc.moveDown();

//     const ignoreFields = ['__v','_id'];
//     for (const key of Object.keys(data)) {
//       if (ignoreFields.includes(key)) continue;
//       doc.fontSize(12).text(`${key}: ${data[key]}`);
//       doc.moveDown(0.2);
//     }

//     if (files.length) {
//       doc.addPage();
//       doc.fontSize(14).text("Attached files:", { underline: true });
//       files.forEach(f => {
//         doc.fontSize(12).text(`${f.fieldname} — ${f.originalname}`);
//       });
//     }

//     doc.end();

//     stream.on("finish", async () => {
//       newEntry.pdfPath = pdfPathRelative;
//       await newEntry.save();
//       res.json({ message: "Saved", id: newEntry._id, pdfPath: pdfPathRelative });
//     });

//     stream.on("error", (err) => {
//       console.error("PDF stream error", err);
//       res.status(500).json({ error: "Error generating PDF" });
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET /api/inhouse (list) — optional as internships router may provide it
// router.get("/", async (req, res) => {
//   try {
//     const list = await Inhouse.find().sort({ submittedAt: -1 });
//     res.json(list);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;




  // const express = require("express");
  // const router = express.Router();
  // const multer = require("multer");
  // const path = require("path");
  // const fs = require("fs");
  // const PDFDocument = require("pdfkit");
  // const Inhouse = require("../models/Inhouse");

  // // Ensure uploads folder exists
  // const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads");
  // if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

  // // Multer config
  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, UPLOAD_DIR);
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, Date.now() + "_" + file.originalname.replace(/\s+/g, "_"));
  //   }
  // });
  // const upload = multer({ storage });

  // // ================= POST (Save Inhouse Form + Generate PDF) =================
  // router.post("/", upload.any(), async (req, res) => {
  //   try {
  //     const data = req.body || {};
  //     const files = (req.files || []).map(f => ({
  //       fieldname: f.fieldname,
  //       originalname: f.originalname,
  //       path: path.relative(path.join(__dirname, "..", ".."), f.path)
  //     }));

  //     // Build document
  //     const newEntry = new Inhouse({
  //       ...data,
  //       files: files.map(f => f.path),
  //       resumePath: files.find(f => f.fieldname === "resume")?.path || "",
  //       bonafidePath: files.find(f => f.fieldname === "bonafide")?.path || ""
  //     });

  //     await newEntry.save();

  //     // Generate a simple PDF summary
  //     const pdfName = Date.now() + "_inhouse.pdf";
  //     const pdfPathFull = path.join(UPLOAD_DIR, pdfName);
  //     const pdfPathRelative = path.join("uploads", pdfName);

  //     const doc = new PDFDocument();
  //     const stream = fs.createWriteStream(pdfPathFull);
  //     doc.pipe(stream);

  //     doc.fontSize(18).text("Inhouse Application", { align: "center" });
  //     doc.moveDown();

  //     const ignoreFields = ["__v", "_id"];
  //     for (const key of Object.keys(data)) {
  //       if (ignoreFields.includes(key)) continue;
  //       doc.fontSize(12).text(`${key}: ${data[key]}`);
  //       doc.moveDown(0.2);
  //     }

  //     if (files.length) {
  //       doc.addPage();
  //       doc.fontSize(14).text("Attached files:", { underline: true });
  //       files.forEach(f => {
  //         doc.fontSize(12).text(`${f.fieldname} — ${f.originalname}`);
  //       });
  //     }

  //     doc.end();

  //     stream.on("finish", async () => {
  //       newEntry.pdfPath = pdfPathRelative;
  //       await newEntry.save();
  //       res.json({ message: "Saved", id: newEntry._id, pdfPath: pdfPathRelative });
  //     });

  //     stream.on("error", (err) => {
  //       console.error("PDF stream error", err);
  //       res.status(500).json({ error: "Error generating PDF" });
  //     });

  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ error: err.message });
  //   }
  // });

  // // ================= GET All Inhouse Entries =================
  // router.get("/", async (req, res) => {
  //   try {
  //     const list = await Inhouse.find().sort({ submittedAt: -1 });
  //     res.json(list);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });

  // // ================= GET PDF by Email + Phone =================
  // router.get("/pdf", async (req, res) => {
  //   const { email, phone } = req.query;

  //   try {
  //     const student = await Inhouse.findOne({ email, phone });
  //     if (!student || !student.pdfPath) {
  //       return res.status(404).json({ error: "PDF not found" });
  //     }

  //     const filePath = path.join(__dirname, "..", "..", student.pdfPath);
  //     if (!fs.existsSync(filePath)) {
  //       return res.status(404).json({ error: "File missing on server" });
  //     }

  //     res.sendFile(filePath);
  //   } catch (err) {
  //     console.error("Error fetching PDF:", err);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // });

  // // ================= GET Uploaded Docs by Email + Phone =================
  // router.get("/doc", async (req, res) => {
  //   const { email, phone } = req.query;

  //   try {
  //     const student = await Inhouse.findOne({ email, phone });
  //     if (!student) {
  //       return res.status(404).json({ error: "Student not found" });
  //     }

  //     // Collect all uploaded docs (resume + bonafide + others)
  //     const docFiles = [];
  //     if (student.resumePath) docFiles.push(student.resumePath);
  //     if (student.bonafidePath) docFiles.push(student.bonafidePath);
  //     if (student.files?.length) docFiles.push(...student.files);

  //     if (!docFiles.length) {
  //       return res.status(404).json({ error: "No documents uploaded" });
  //     }

  //     // For now: serve first doc (can be extended to return list)
  //     const absolutePath = path.join(__dirname, "..", "..", docFiles[0]);
  //     if (!fs.existsSync(absolutePath)) {
  //       return res.status(404).json({ error: "File missing on server" });
  //     }

  //     res.sendFile(absolutePath);
  //   } catch (err) {
  //     console.error("Error fetching Doc:", err);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // });

  // module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const Inhouse = require("../models/Inhouse");

// Ensure uploads folder exists
const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname.replace(/\s+/g, "_"));
  }
});
const upload = multer({ storage });

// ================= POST (Save Inhouse Form + Generate PDF) =================
router.post("/", upload.any(), async (req, res) => {
  try {
    const data = req.body || {};
    const files = (req.files || []).map(f => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      path: path.relative(path.join(__dirname, "..", ".."), f.path)
    }));

    // Build document
    const newEntry = new Inhouse({
      ...data,
      files: files.map(f => f.path),
      resumePath: files.find(f => f.fieldname === "resume")?.path || "",
      bonafidePath: files.find(f => f.fieldname === "bonafide")?.path || ""
    });

    await newEntry.save();

    // Generate a simple PDF summary
    const pdfName = Date.now() + "_inhouse.pdf";
    const pdfPathFull = path.join(UPLOAD_DIR, pdfName);
    const pdfPathRelative = path.join("uploads", pdfName);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPathFull);
    doc.pipe(stream);

    doc.fontSize(18).text("Inhouse Application", { align: "center" });
    doc.moveDown();

    const ignoreFields = ["__v", "_id"];
    for (const key of Object.keys(data)) {
      if (ignoreFields.includes(key)) continue;
      doc.fontSize(12).text(`${key}: ${data[key]}`);
      doc.moveDown(0.2);
    }

    if (files.length) {
      doc.addPage();
      doc.fontSize(14).text("Attached files:", { underline: true });
      files.forEach(f => {
        doc.fontSize(12).text(`${f.fieldname} — ${f.originalname}`);
      });
    }

    doc.end();

    stream.on("finish", async () => {
      newEntry.pdfPath = pdfPathRelative;
      await newEntry.save();
      res.json({ message: "Saved", id: newEntry._id, pdfPath: pdfPathRelative });
    });

    stream.on("error", (err) => {
      console.error("PDF stream error", err);
      res.status(500).json({ error: "Error generating PDF" });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ================= GET All Inhouse Entries =================
router.get("/", async (req, res) => {
  try {
    const list = await Inhouse.find().sort({ submittedAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET PDF by Email =================
router.get("/email/:email/pdf", async (req, res) => {
  try {
    const { email } = req.params;

    const student = await Inhouse.findOne({ email });
    if (!student || !student.pdfPath) {
      return res.status(404).json({ error: "PDF not found" });
    }

    const filePath = path.join(__dirname, "..", "..", student.pdfPath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File missing on server" });
    }

    res.sendFile(filePath);
  } catch (err) {
    console.error("Error fetching PDF:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ================= GET Docs by Email =================
router.get("/email/:email/doc", async (req, res) => {
  try {
    const email = req.params.email;
    const student = await Inhouse.findOne({ email });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const docFiles = [];
    if (student.resumePath) docFiles.push(student.resumePath);
    if (student.bonafidePath) docFiles.push(student.bonafidePath);
    if (student.files?.length) docFiles.push(...student.files);

    if (!docFiles.length) {
      return res.status(404).json({ error: "No documents uploaded" });
    }

    const absolutePath = path.join(__dirname, "..", "..", docFiles[0]);
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ error: "File missing on server" });
    }

    res.sendFile(absolutePath);
  } catch (err) {
    console.error("Error fetching Doc:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

