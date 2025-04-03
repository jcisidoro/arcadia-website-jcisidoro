import Image from "next/image";

export default function ArcadiaIntroPage() {
  return (
    <div
      className="w-full h-full lg:h-[600px] bg-white mb-0.5 p-4 lg:p-10 flex flex-col lg:flex-row items-center gap-10"
      id="whoWeAre"
    >
      <div className="w-[300px] sm:w-[600px] lg:w-full h-[250px] sm:h-[300px] lg:h-[450px] relative">
        <Image
          src="/meeting1.avif"
          alt="Meeting Image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col w-full h-full gap-10 lg:text-right p-4 lg:justify-center">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-[#326333] font-cormorant">
          A Growing Network for Impact
        </h1>
        <p className="text-lg xl:text-2xl text-justify">
          <span className="font-bold font-cormorant text-2xl xl:text-3xl">
            Arcadia{" "}
          </span>{" "}
          brings together a diverse ecosystem of changemakers—including the
          academe, local and national government agencies, NGOs, industry
          associations, and chambers of commerce. By fostering cross-sector
          collaboration, we ensure that circular economy strategies are
          informed, inclusive, and built for long-term sustainability.
        </p>
      </div>
    </div>
  );
}
