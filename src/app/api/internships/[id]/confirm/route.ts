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

// Models
let StudentModel: any;
let ConfirmedInternModel: any;

async function initializeModels() {
  if (!StudentModel || !ConfirmedInternModel) {
    await connectToDatabase();
    StudentModel = mongoose.models.Student || mongoose.model('Student', studentSchema);
    ConfirmedInternModel = mongoose.models.Internship || mongoose.model('Internship', internshipSchema, 'confirmedstudents');
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await initializeModels();
    
    const { id } = params;
    
    const applicant = await StudentModel.findById(id);
    if (!applicant) {
      return NextResponse.json({ error: "Applicant not found" }, { status: 404 });
    }

    const alreadyConfirmed = await ConfirmedInternModel.findOne({ email: applicant.email });
    if (alreadyConfirmed) {
      return NextResponse.json({ message: "This intern has already been confirmed." }, { status: 409 });
    }

    // 1️⃣ Save to ConfirmedIntern collection
    const newConfirmedIntern = new ConfirmedInternModel({
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
      college: applicant.college,
      department: applicant.department,
      internshipType: applicant.internshipType,
      timePeriod: applicant.timePeriod,
      fromDate: applicant.fromDate,
      toDate: applicant.toDate,
      status: "Confirmed",
    });
    await newConfirmedIntern.save();

    // 2️⃣ WhatsApp Integration (fire and forget, doesn't block deletion)
    (async () => {
      try {
        const axios = (await import('axios')).default;
        const sanitizedPhoneNumber = applicant.phone.replace(/\D/g, '');
        const recipientPhoneNumber = sanitizedPhoneNumber;
        const applicantName = applicant.name.split(" ")[0]; // first name
        const formattedFromDate = new Date(applicant.fromDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const formattedToDate = new Date(applicant.toDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const WHATSAPP_API_URL = `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

        const requestBody = {
          messaging_product: "whatsapp",
          to: recipientPhoneNumber,
          type: "template",
          template: {
            name: "internship_confirmation",
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: applicantName },
                  { type: "text", text: formattedFromDate },
                  { type: "text", text: formattedToDate },
                  { type: "text", text: applicant.internshipType }
                ]
              }
            ] 
          }
        };

        await axios.post(WHATSAPP_API_URL, requestBody, {
          headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          }
        });

        console.log(`✅ WhatsApp confirmation sent to ${recipientPhoneNumber}`);
      } catch (whatsappError: any) {
        console.error("🔥 WhatsApp message failed, intern still confirmed.", whatsappError.response?.data || whatsappError.message);
      }
    })();

    // 3️⃣ DELETE the student from Student collection
    await StudentModel.findByIdAndDelete(applicant._id);

    return NextResponse.json({
      message: "Student confirmed, moved to ConfirmedInterns, and WhatsApp message initiated.",
      confirmedIntern: newConfirmedIntern,
    });

  } catch (error: any) {
    console.error("Error during confirmation:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}