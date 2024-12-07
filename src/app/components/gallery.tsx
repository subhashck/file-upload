import fs from "node:fs/promises";
import path from "node:path";
import Lightbox from "./lightbox";

async function Gallery() {
    const imageDir = '/public/uploads'
    const imageDirectory = path.join(process.cwd(), imageDir);
    const imageFilenames = await fs.readdir(imageDirectory)
    return (
        <div className="min-h-screen  flex flex-col items-center justify-center p-2">
            <h1 className="text-3xl font-bold mb-6">Image Gallery</h1>
            <Lightbox images={imageFilenames} />
        </div>
        // <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-6">

        //     {imageFilenames.map((image, index) => {
        //         return <div key={index} className=" mx-auto relative w-36 h-28 ">
        //             <Link href={"/uploads/" + image}>
        //                 <Image src={"/uploads/" + image} alt={image} fill objectFit="contain" />
        //             </Link>

        //         </div>
        //     })}
        // </div>
    )
}
export default Gallery