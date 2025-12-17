import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Define the Contact schema directly
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Declined'],
    default: 'Pending',
  },
  timestamp: { type: Date, default: Date.now },
});

// Create connection to startupsDB
let ContactModel: any;

async function initializeModel() {
  if (!ContactModel) {
    // Create a new connection to the startupsDB
    const startupsConnection = mongoose.createConnection(process.env.MONGO_URI_STARTUPS!);
    ContactModel = startupsConnection.model('Contact', ContactSchema);
  }
}

export async function GET() {
  try {
    await initializeModel();
    const submissions = await ContactModel.find({}).sort({ timestamp: -1 });
    return NextResponse.json(submissions);
  } catch (error: any) {
    console.error('Server Error:', error.message);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}