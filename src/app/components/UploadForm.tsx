"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const fileInput = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<any>("Please select a file");
  const router = useRouter()

  function handleChange(e: any) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  async function uploadFile(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("file", fileInput?.current?.files?.[0]!);

    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (result.status === "success") {
      alert('File uploaded')
      setFile(undefined)
      router.refresh()
    }
    console.log(result);
  }

  return (
    <form className="flex flex-col gap-4 mx-auto mt-5">
      <div className="flex flex-row items-center">
        <input type="file" id="custom-input" name="file" ref={fileInput} onChange={handleChange} accept="image/*" hidden />
        <label
          htmlFor="custom-input"
          className="block  mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-pink-50
            text-pink-700 hover:bg-pink-100 cursor-pointer"
        >
          Choose file
        </label>
        
      </div>
      <div >
        {file!=="Please select a file" && file && 
        <><p className="text-sm">{fileInput?.current?.files?.[0].name}</p><Image src={file} alt="dfdf" width={100} height={100} /></>
        }
      </div>
      <button type="submit" onClick={uploadFile}>
        Submit
      </button>
      <button type="reset" onClick={() => setFile(undefined)}>
        Reset
      </button>
    </form>
  );
}