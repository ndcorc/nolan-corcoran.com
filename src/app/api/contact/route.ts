// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Make sure API key exists
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate input
        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        console.log('Attempting to send email with Resend...');

        // Send email
        const { data, error } = await resend.emails.send({
            from: 'Nolan Corcoran <onboarding@resend.dev>', // Use this email while in testing
            to: 'nd.corc@gmail.com',
            subject: `New Contact Form Submission: ${subject}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
            replyTo: email
        });

        if (error) {
            console.error('Resend API Error:', error);
            return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
        }

        console.log('Email sent successfully:', data);

        return NextResponse.json({ message: 'Email sent successfully', data }, { status: 200 });
    } catch (error) {
        console.error('Unexpected error in contact form:', error);
        return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
    }
}
