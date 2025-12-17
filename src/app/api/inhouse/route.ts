import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define schema directly
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

// Model
let InhouseModel: any;

async function initializeModels() {
  if (!InhouseModel) {
    await connectToDatabase();
    InhouseModel = mongoose.models.Inhouse || mongoose.model('Inhouse', inhouseSchema, 'inhouses');
  }
}

export async function GET() {
  try {
    await initializeModels();
    const list = await InhouseModel.find().sort({ submittedAt: -1 });
    return NextResponse.json(list);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}