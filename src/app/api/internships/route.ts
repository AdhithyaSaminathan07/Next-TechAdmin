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

// Models
let StudentModel: any;

async function initializeModels() {
  if (!StudentModel) {
    await connectToDatabase();
    StudentModel = mongoose.models.Student || mongoose.model('Student', studentSchema);
  }
}

export async function GET() {
  try {
    await initializeModels();
    const students = await StudentModel.find({});
    return NextResponse.json(students);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}