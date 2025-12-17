import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

// We need to import the models differently in Next.js API routes
let HomecomingModel: any;

async function initializeModels() {
  if (!HomecomingModel) {
    await connectToDatabase();
    
    // Dynamically import models to avoid issues with mongoose connections
    const homecomingModule = await import('../../../../../../admin-backend/models/Homecoming');
    HomecomingModel = homecomingModule.default;
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
    };

    const application = new HomecomingModel(appData);
    await application.save();
    
    return NextResponse.json({ message: "Application submitted successfully!", data: application });
  } catch (error: any) {
    console.error("Error creating application:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}