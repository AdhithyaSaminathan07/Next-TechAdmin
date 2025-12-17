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

export async function GET() {
  try {
    await initializeModels();
    const confirmedList = await InternshipModel.find();
    return NextResponse.json(confirmedList);
  } catch (error: any) {
    console.error("Error fetching confirmed interns:", error);
    return NextResponse.json({ error: "Failed to fetch confirmed interns" }, { status: 500 });
  }
}