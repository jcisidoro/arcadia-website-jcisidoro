import Image from "next/image";

export default function PositionPapersPage() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full lg:h-[600px] bg-white mt-0.5 p-4 lg:p-10 items-center gap-10">
      <div className="w-[300px] sm:w-[600px] lg:w-full h-[250px] sm:h-[300px] lg:h-[450px] relative">
        <Image
          src="/papers.avif"
          alt="Position Papers Image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col w-full h-full gap-10 p-4 text-right">
        <h1 className="text-4xl lg:text-5xl xl:text-7xl font-cormorant font-bold text-[#326333]">
          Position Papers
        </h1>

        <p className="text-sm lg:text-lg xl:text-2xl flex-1 text-justify">
          <span className="font-bold font-cormorant text-xl xl:text-[35px]">
            Arcadia{" "}
          </span>{" "}
          develops position papers that outline informed perspectives on
          critical sustainability issues. These papers offer a deep dive into
          industry challenges, policy recommendations, and strategic actions
          that stakeholders should adopt to drive systemic change. Backed by
          data, case studies, and expert insights, our position papers serve as
          authoritative resources for guiding decision-makers in business,
          government, and civil society toward impactful, sustainability-focused
          policies and practices.
        </p>
      </div>
    </div>
  );
}
