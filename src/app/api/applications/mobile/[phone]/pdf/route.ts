import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define homecoming schema (same as in applications/route.ts)
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

// Model
let HomecomingModel: any;

async function initializeModels() {
  if (!HomecomingModel) {
    await connectToDatabase();
    HomecomingModel = mongoose.models.Homecoming || mongoose.model('Homecoming', homecomingSchema);
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ phone: string }> }) {
  try {
    await initializeModels();
    
    // Decode the phone parameter
    const { phone } = await params;
    const decodedPhone = decodeURIComponent(phone);
    
    // Find the homecoming application by WhatsApp number
    const application = await HomecomingModel.findOne({ whatsapp: decodedPhone });
    
    if (!application) {
      return new NextResponse('<h2>Application Not Found</h2><p>No application was found associated with that mobile number.</p>', { 
        status: 404, 
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    // Generate HTML content for PDF
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
              <div class="row"><span class="label">Full Name:</span><span class="value">${application.fullName || "-"}</span></div>
              <div class="row"><span class="label">Date of Birth:</span><span class="value">${application.dob || "-"}</span></div>
              <div class="row"><span class="label">Gender:</span><span class="value">${application.gender || "-"}</span></div>
              <div class="row"><span class="label">WhatsApp:</span><span class="value">${application.whatsapp || "-"}</span></div>
              <div class="row"><span class="label">Email:</span><span class="value">${application.email || "-"}</span></div>
              <div class="row"><span class="label">Address:</span><span class="value">${application.address || "-"}</span></div>
              <div class="row"><span class="label">City:</span><span class="value">${application.city || "-"}</span></div>
              <div class="row"><span class="label">Pincode:</span><span class="value">${application.pincode || "-"}</span></div>
            </div>
            <div class="photo-box">${photoHTML}</div>
          </div>
          <h2>SECTION B: EDUCATIONAL DETAILS</h2>
          <div class="row"><span class="label">Level of Study:</span><span class="value">${application.level || "-"}</span></div>
          <div class="row"><span class="label">Course:</span><span class="value">${application.course || "-"}</span></div>
          <div class="row"><span class="label">Specialization:</span><span class="value">${application.specialization || "-"}</span></div>
          <div class="row"><span class="label">College:</span><span class="value">${application.college || "-"}</span></div>
          <div class="row"><span class="label">Current Year:</span><span class="value">${application.year || "-"}</span></div>
          <div class="row"><span class="label">Roll No:</span><span class="value">${application.rollNo || "-"}</span></div>
          <div class="row"><span class="label">Academic Requirement:</span><span class="value">${application.academicRequirement ? "Yes" : "No"}</span></div>
          <h2>SECTION C: INTERNSHIP PREFERENCES</h2>
          <div class="row"><span class="label">Departments:</span><span class="value">${(application.departments || []).join(", ")}</span></div>
          <div class="row"><span class="label">Other Department:</span><span class="value">${application.otherDepartment || "-"}</span></div>
          <div class="row"><span class="label">Mode:</span><span class="value">${application.mode || "-"}</span></div>
          <div class="row"><span class="label">Duration:</span><span class="value">${application.duration || "-"}</span></div>
          <div class="row"><span class="label">From Date:</span><span class="value">${application.fromDate || "-"}</span></div>
          <div class="row"><span class="label">To Date:</span><span class="value">${application.toDate || "-"}</span></div>
          <h2>SECTION D: SUPPORTING DOCUMENTS</h2>
          <div class="row"><span class="label">Resume:</span><span class="value">${application.resume ? application.resume : "-"}</span></div>
          <div class="row"><span class="label">NOC:</span><span class="value">${application.noc ? application.noc : "-"}</span></div>
          <div class="row"><span class="label">LinkedIn:</span><span class="value">${application.linkedin || "-"}</span></div>
          <div class="section-e">
            <h2>SECTION E: DECLARATION</h2>
            <p>I hereby declare that the information provided is accurate and complete to the best of my knowledge.</p>
            <div class="signature">
              <span class="label">Applicant Signature:</span><span class="signature-line"></span>
              <span class="label" style="margin-left:30px;">Date:</span> ${application.signedOn || "-"}
            </div>
          </div>
        </body>
      </html>
    `;
    
    // Import puppeteer dynamically
    const puppeteer = await import('puppeteer');
    
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

    // Return the PDF with appropriate headers
    const response = new NextResponse(pdfBuffer);
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set('Content-Disposition', `inline; filename=Application_${application.whatsapp}.pdf`);
    
    return response;
  } catch (error: any) {
    console.error("Error fetching PDF:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}