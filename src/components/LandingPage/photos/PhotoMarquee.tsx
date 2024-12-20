"use client";
import SectionTitle from "@/components/customUi/SectionTitle";
import { useFetchData } from "@/hooks/useApi";
import { PhotoI } from "@/types/Types";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const PhotoMarquee = () => {
  const { data, isLoading, error } = useFetchData(
    ["photos"],
    `photos/get-all-client-photos`
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading photos</p>;

  const renderPattern = (photos: PhotoI[]) => {
    return photos.map((photo, index) => {
      const isFullHeight = index % 6 === 0 || index % 6 === 3; // Full height images
      const isStackedCol = index % 6 === 1 || index % 6 === 4; // Stacked column images

      if (isFullHeight) {
        return (
          <div key={photo._id} className="w-[200px] lg:w-72 h-80 lg:h-96">
            <Image
              src={photo.image}
              width={200}
              height={320}
              alt={`Photo ${index}`}
              className="w-[200px] lg:w-72 h-80 lg:h-96 object-cover"
            />
          </div>
        );
      } else if (isStackedCol) {
        const nextPhoto = photos[index + 1];
        return (
          <div
            key={photo._id}
            className="w-[200px] h-80 lg:h-96 flex flex-col gap-2 "
          >
            <div className="w-full h-1/2">
              <Image
                src={photo.image}
                width={200}
                height={100}
                className="w-full h-full object-cover"
                alt={`Photo ${index}`}
              />
            </div>
            {nextPhoto && (
              <div className="w-full h-1/2">
                <Image
                  src={nextPhoto.image}
                  width={200}
                  height={100}
                  className="w-full h-full object-cover"
                  alt={`Photo ${index + 1}`}
                />
              </div>
            )}
          </div>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <section className="overflow-hidden">
      <SectionTitle title="Events" className="mb-4" />
      <div className="h-80 lg:h-96 space-x-2">
        <Marquee
          speed={100}
          gradient={false}
          className="flex items-center space-x-4 gap-4"
        >
          <div className="flex items-center gap-2">{renderPattern(data)}</div>
        </Marquee>
      </div>
    </section>
  );
};

export default PhotoMarquee;
