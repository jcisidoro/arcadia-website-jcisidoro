import { PreviousCarousel } from "./PreviousCarousel";

export default function PreviousEvents() {
  return (
    <div className="flex w-full h-full relative bg-white mt-0.5">
      <div className="w-full h-full flex flex-col items-center p-8">
        <h1 className="text-2xl lg:text-4xl xl:text-7xl font-bold uppercase mb-4 text-[#326333] font-cormorant">
          Previous Events
        </h1>
        <PreviousCarousel />
      </div>
    </div>
  );
}
