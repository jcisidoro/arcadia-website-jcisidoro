import Image from "next/image";

export default function PublicationsIntroPage() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full xl:h-[500px] bg-white p-4 lg:p-10 items-center gap-10">
      <div className="flex lg:hidden w-[300px] sm:w-[600px] lg:w-full h-[250px] sm:h-[300px] lg:h-[450px] relative">
        <Image
          src="/meeting.avif"
          alt="Meeting Image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col w-full h-full gap-10 p-4">
        <h1 className="text-4xl lg:text-5xl xl:text-7xl font-cormorant font-bold text-[#326333]">
          Market Analysis
        </h1>

        <p className="text-sm lg:text-lg xl:text-2xl flex-1 text-justify">
          <span className="font-bold font-cormorant text-xl xl:text-[35px]">
            Arcadia{" "}
          </span>
          conducts in-depth market analyses to provide businesses with a
          comprehensive understanding of the sustainability landscape. These
          analyses explore trends, opportunities, challenges, and key drivers in
          the transition to a circular economy. By delivering actionable
          insights, we enable companies to identify growth areas, anticipate
          market shifts, and align their strategies with the evolving demands of
          sustainable practices and consumer preferences.
        </p>
      </div>

      <div className="hidden lg:flex w-[300px] sm:w-[600px] lg:w-full h-[250px] sm:h-[300px] lg:h-[450px] relative">
        <Image
          src="/meeting.avif"
          alt="Meeting Image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
