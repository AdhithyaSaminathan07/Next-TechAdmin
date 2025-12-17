import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define schemas directly
const internshipSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    college: String,
    department: String,
    internshipType: String,
    timePeriod: String,
    fromDate: String,
    toDate: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true, collection: "confirmedstudents" }
);

const inhouseSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    name: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    college: String,
    department: String,
    internshipType: String,
    timePeriod: String,
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

// Models
let InternshipModel: any;
let InhouseModel: any;

async function initializeModels() {
  if (!InternshipModel || !InhouseModel) {
    await connectToDatabase();
    InternshipModel = mongoose.models.Internship || mongoose.model('Internship', internshipSchema, 'confirmedstudents');
    InhouseModel = mongoose.models.Inhouse || mongoose.model('Inhouse', inhouseSchema, 'inhouses');
  }
}

export async function POST(req: Request) {
  try {
    await initializeModels();
    
    const { id } = await req.json(); // We will get the student's unique ID from the frontend

    // 1. Find the student in the 'confirmedstudents' collection
    const confirmedStudent = await InternshipModel.findById(id);
    if (!confirmedStudent) {
      return NextResponse.json({ message: "Student not found in confirmed list." }, { status: 404 });
    }

    // 2. Create a new document for the 'inhouses' collection
    const inhouseStudent = new InhouseModel({
      // Map the data from the old model to the new one
      fullName: confirmedStudent.name,
      name: confirmedStudent.name,
      email: confirmedStudent.email,
      phone: confirmedStudent.phone,
      college: confirmedStudent.college,
      department: confirmedStudent.department,
      internshipType: confirmedStudent.internshipType,
      timePeriod: confirmedStudent.timePeriod,
      fromDate: confirmedStudent.fromDate,
      toDate: confirmedStudent.toDate,
    });
    
    // 3. Save the new document into the 'inhouses' collection
    await inhouseStudent.save();

    // 4. Delete the original document from the 'confirmedstudents' collection
    await InternshipModel.findByIdAndDelete(id);

    // 5. Send a success message back to the frontend
    return NextResponse.json({ message: "Success! Student has been moved to In-House." });

  } catch (error: any) {
    console.error("Error moving student to in-house:", error);
    return NextResponse.json({ message: "A server error occurred while moving the student." }, { status: 500 });
  }
}