import Image from "next/image";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { ReactNode } from "react";

interface EventCardsProps {
  src: string;
  eventAltImg: string;
  description: ReactNode;
  description1: ReactNode;
  author: string;
  onClick: () => void;
}

export default function EventCards({
  src,
  eventAltImg,
  onClick,
}: EventCardsProps) {
  return (
    <div className="w-[300px] lg:w-[450px] xl:w-[500px] h-40 lg:h-64 xl:h-72 rounded border-black/50 border group relative">
      <div className="w-full h-full relative">
        {src && (
          <Image
            unoptimized
            src={src}
            alt={eventAltImg || "Event Image"}
            fill
            className="object-cover"
          />
        )}
      </div>
      <button
        onClick={onClick}
        className="bg-[#326333]/90 w-full h-full flex items-center justify-center scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300 cursor-pointer absolute top-0"
      >
        <span className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
          Event Details{" "}
          <IoIosArrowDroprightCircle className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
        </span>
      </button>
    </div>
  );
}
