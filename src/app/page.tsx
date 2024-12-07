import UploadForm from "./components/UploadForm";
import Gallery from "./components/gallery";
// import Lightbox from "./components/lightbox";


export default async function Home() {
  return (
    <main className="mx-auto max-w-screen-lg flex flex-col gap-10  justify-center border-x border-gray-700 p-5">
      <h1 className=" bg-slate-800 p-5 text-5xl -m-5">File Upload</h1>
    
      <UploadForm />
      <Gallery />

    </main>
  );
}
