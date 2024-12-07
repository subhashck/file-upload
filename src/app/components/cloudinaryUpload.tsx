'use client';

import { useState } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e:any) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const response = await fetch('/api/uploadCloudinary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: file }),
      });

      const data = await response.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
