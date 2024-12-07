"use client";
import { CldImage, CldUploadButton, CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import FileUpload from '../components/cloudinaryUpload';


// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
    const [resource, setResource] = useState();
    return (
        <><CldImage
            src="rwpjju3dth83xezvzwq4" // Use this sample image or upload your own via the Media Explorer
            width="500" // Transform the image: auto-crop to square aspect_ratio
            height="500"
            alt="sdsd"
            crop={{
                type: 'auto',
                source: true
            }} />


            {/* <FileUpload /> */}
            <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params">
                {({ open }) => {
                    return (
                        <button onClick={() => open()}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
        </>
    );
}