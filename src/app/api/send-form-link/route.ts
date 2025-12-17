import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  console.log("📩 Incoming request");
  
  try {
    const { email, link } = await req.json();
    
    console.log("📩 Email value received:", email);

    // Validate email
    if (!email || typeof email !== "string" || !email.trim()) {
      console.warn("⚠ Missing or invalid email in request.");
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // Use provided link or fallback from .env
    const formLink = link && link.trim() ? link.trim() : process.env.FORM_LINK;

    if (!formLink) {
      console.warn("⚠ No form link provided or in environment variables.");
      return NextResponse.json({ error: "Form link is missing" }, { status: 400 });
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email.trim(),
      subject: "In-House Registration Form",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Hello,</p>
          
          <p>To complete your entry process, please fill out the in-house registration form linked below.<br> 
          This step is mandatory for our internal records.</p>
          
          <p>
            <strong>Form link:</strong><br>
            <a href="${formLink}" target="_blank" style="color: #007BFF;">${formLink}</a>
          </p>
          
          <p>Should you have any questions or require assistance,<br> please contact the admin desk.</p>
          
          <p>Thanks & Regards,<br>
          Tech Vaseegrah | Administration<br>
          +91 85240 89733<br>
          techvaseegrah@gmail.com<br>
          www.techvaseegrah.com </p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${email}:`, info.response);

    return NextResponse.json({ success: true, message: "Link sent successfully" });
  } catch (error: any) {
    console.error("❌ Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}