import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define schema directly
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

// Model
let InternshipModel: any;

async function initializeModels() {
  if (!InternshipModel) {
    await connectToDatabase();
    InternshipModel = mongoose.models.Internship || mongoose.model('Internship', internshipSchema, 'confirmedstudents');
  }
}

export async function POST(req: Request) {
  try {
    await initializeModels();
    
    const { id } = await req.json(); // Get the unique ID from the frontend

    // Find the student by their ID and update only the 'status' field
    const updatedStudent = await InternshipModel.findByIdAndUpdate(
      id,
      { status: "Exited" }, // Set the new status
      { new: true }        // This option tells mongoose to return the updated document
    );

    if (!updatedStudent) {
      return NextResponse.json({ message: "Student not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Student status has been marked as Exited." });

  } catch (error: any) {
    console.error("Error marking student as exit:", error);
    return NextResponse.json({ message: "A server error occurred." }, { status: 500 });
  }
}