import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define schema directly
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

// Since we can't use multer in Next.js API routes, we'll need to handle file uploads differently
// For now, we'll create a simplified version that handles JSON data only
export async function POST(req: Request) {
  try {
    await initializeModels();
    
    // For simplicity, we're assuming JSON data only in this migration
    // File upload handling would require additional implementation
    const body = await req.json();
    
    const appData = {
      ...body,
      departments: Array.isArray(body.departments) ? body.departments : [],
      signedOn: body.signedOn || new Date().toISOString().split("T")[0],
    };

    if (!appData.email) {
      return NextResponse.json({ error: "Email is a required field." }, { status: 400 });
    }

    const application = await HomecomingModel.findOneAndUpdate(
      { email: appData.email },
      appData,
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error("❌ Error saving application:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}