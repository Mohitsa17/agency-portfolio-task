import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Client from '@/models/Client';

async function verifyAdmin(request: NextRequest) {
  const { verifyAdmin } = await import('@/lib/auth');
  return verifyAdmin(request);
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const clients = await Client.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: clients }, { status: 200 });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.valid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();
    const { name, designation, description, image } = body;

    if (!name || !designation || !description || !image) {
      return NextResponse.json(
        { error: 'Name, designation, description, and image are required' },
        { status: 400 }
      );
    }

    const client = await Client.create({
      name,
      designation,
      description,
      image,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, data: client },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
}

