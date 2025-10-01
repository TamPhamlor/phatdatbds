import { Listing } from "@/app/types/products";
import Image from "next/image";

interface PhotoGalleryProps {
  images: Listing["images"];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  return (
    <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">Photo Gallery</div>
        <a href="#" className="text-sm text-indigo-600">See all</a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((img) => (
          <div key={img.sort_order} className="relative w-full h-28 sm:h-32">
            <Image
              src={img.url}
              alt="Gallery"
              fill
              unoptimized
              className="rounded-xl object-cover"
              sizes="(max-width: 640px) 50vw,
                     (max-width: 768px) 33vw,
                     25vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
