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

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await initializeModel();
    
    const { id } = params;
    const { status } = await req.json(); // Get status from request body ('Confirmed' or 'Declined')

    // Validate the status
    if (!['Confirmed', 'Declined'].includes(status)) {
      return NextResponse.json({ msg: 'Invalid status value.' }, { status: 400 });
    }

    // Find the submission by its ID and update it
    const updatedSubmission = await ContactModel.findByIdAndUpdate(
      id,
      { status: status }, // The fields to update
      { new: true } // This option returns the updated document
    );

    if (!updatedSubmission) {
      return NextResponse.json({ msg: 'Submission not found.' }, { status: 404 });
    }

    return NextResponse.json(updatedSubmission); // Send back the updated submission

  } catch (error: any) {
    console.error('Server Error:', error.message);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}