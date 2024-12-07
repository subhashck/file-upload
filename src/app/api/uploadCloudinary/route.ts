import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary'

// Configure Cloudinary
cloudinary.v2.config ({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Add these to your .env.local file
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json(); // The base64-encoded file string

    // Upload to Cloudinary
    const uploadedResponse = await cloudinary.v2.uploader.upload(data, {
      folder: 'nextjs_uploads', // Optional: specify a folder
    });

    return NextResponse.json({ url: uploadedResponse.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
