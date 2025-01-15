// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(2),
    message: z.string().min(10)
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the request body
        const { name, email, subject, message } = schema.parse(body);

        // Here you would typically send the email using your preferred method
        // For example, using nodemailer, SendGrid, etc.

        // For now, we'll just log it
        console.log('Contact form submission:', {
            name,
            email,
            subject,
            message
        });

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
