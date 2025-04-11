// src/app/api/email/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, contact, notes } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER!,
        pass: process.env.GMAIL_APP_PASSWORD!,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject:
        "Thank You for Reaching Out to Arcadia - We'll Be in Touch Soon!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
          <h2 style="font-size: 24px; color: #326333;">Hello ${firstName} ${lastName},</h2>
          <p style="font-size: 16px;">Thank you for reaching out to us at Arcadia! We truly appreciate your submission and will review your information as soon as possible.</p>
    
          <p style="font-size: 16px;">Our team is currently reviewing your message, and we&apos;ll get back to you shortly. Rest assured, we&apos;re here to assist you, and we&apos;ll follow up as soon as we have more information to share.</p>
    
          <p style="font-size: 16px;">We look forward to connecting with you soon!</p>
    
          <p style="font-size: 16px;">Warm regards,</p>
          <p style="font-size: 16px; font-weight: bold;">The Arcadia Team</p>
    
          <hr style="border-top: 2px solid #326333; margin: 30px 0;" />
    
          <p style="font-size: 16px; font-weight: bold;">About Arcadia</p>
          <p style="font-size: 16px;">Arcadia is a sustainability hub for companies committed to advancing sustainability practices and accelerating the transition to a circular economy. We empower businesses to adopt sustainable practices and contribute to a greener future.</p>
    
          <p style="font-size: 16px; font-weight: bold;">Contact Us</p>
          <p style="font-size: 16px;">For general inquiries, please reach out to us at: <a href="mailto:gsm.arcadia@gmail.com" style="color: #326333;">gsm.arcadia@gmail.com</a></p>
    
          <!-- Contact and Notes Section -->
          <p style="font-size: 16px; font-weight: bold;">Your Submitted Information:</p>
          <p style="font-size: 16px;"><strong>Contact:</strong> ${firstName} ${lastName}</p>
          <p style="font-size: 16px;"><strong>Contact:</strong> ${contact}</p>
          <p style="font-size: 16px;"><strong>Notes:</strong> ${notes}</p>

          <p style="text-align: center;">
            <img src="https://arcadia-website-sustainability-hub.vercel.app/arcadiaLogo1.png" alt="Arcadia Logo" style="width: 150px; height: auto; object-fit: cover; display: block; margin: 20px auto;" />
          </p>
    
          <p style="font-size: 16px; text-align: center;">Thank you for choosing Arcadia!<br/> This email was sent via Nodemailer & Gmail 🚀</p>
    
          <p style="font-size: 16px; text-align: center; color: #888;">&copy; ${new Date().getFullYear()} Arcadia. All rights reserved.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { message: "Something went wrong while sending the email." },
      { status: 500 }
    );
  }
}
