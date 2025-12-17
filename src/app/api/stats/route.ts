import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define schemas directly
const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    college: String,
    department: String,
    internshipType: String,
    timePeriod: String,
    fromDate: String,
    toDate: String,
    timestamp: String,
    status: {
      type: String,
      enum: ["Pending", "Confirmed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
    collection: "students",
  }
);

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
let StudentModel: any;
let ConfirmedInternModel: any;
let InhouseModel: any;

async function initializeModels() {
  if (!StudentModel || !ConfirmedInternModel || !InhouseModel) {
    await connectToDatabase();
    
    StudentModel = mongoose.models.Student || mongoose.model('Student', studentSchema);
    ConfirmedInternModel = mongoose.models.Internship || mongoose.model('Internship', internshipSchema, 'confirmedstudents');
    InhouseModel = mongoose.models.Inhouse || mongoose.model('Inhouse', inhouseSchema, 'inhouses');
  }
}

export async function GET() {
  try {
    await initializeModels();
    
    const applicantsCount = await StudentModel.countDocuments();
    const confirmedCount = await ConfirmedInternModel.countDocuments();
    const inhouseCount = await InhouseModel.countDocuments();

    return NextResponse.json({
      applicants: applicantsCount,
      confirmed: confirmedCount,
      inhouse: inhouseCount,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}