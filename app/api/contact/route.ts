import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/models/Contact';

async function verifyAdmin(request: NextRequest) {
  const { verifyAdmin } = await import('@/lib/auth');
  return verifyAdmin(request);
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { fullName, email, phone, city } = body;

    if (!fullName || !email || !phone || !city) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const contact = await Contact.create({
      fullName,
      email,
      phone,
      city,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, data: contact, message: 'Contact submitted successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating contact:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Contact already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to submit contact' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.valid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

