import Image from "next/image";

export default function ReportsAndManifestosPage() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full xl:h-[650px] bg-white p-4 lg:p-10 items-center mt-0.5 gap-10">
      <div className="flex lg:hidden w-[300px] sm:w-[600px] lg:w-full h-[250px] sm:h-[300px] lg:h-[450px] relative">
        <Image
          src="/reports.avif"
          alt="Reports Image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col w-full h-full gap-10 p-4">
        <h1 className="text-4xl lg:text-5xl xl:text-7xl font-cormorant font-bold text-[#326333]">
          Reports and Manifestos
        </h1>

        <p className="text-sm lg:text-lg xl:text-2xl flex-1 text-justify text-black">
          Our waste reports provide detailed assessments of current waste
          management practices, with a focus on gaps, inefficiencies, and
          opportunities for improvement. These reports highlight both local and
          global case studies, offering solutions and technologies that can
          optimize waste management processes. By addressing critical issues in
          post-consumer waste, our waste reports empower companies,
          municipalities, and policymakers to implement effective, sustainable,
          and circular waste management strategies.
        </p>
      </div>

      <div className="hidden lg:flex w-[300px] sm:w-[600px] lg:w-full h-[250px] sm:h-[300px] lg:h-[450px] relative">
        <Image
          src="/reports.avif"
          alt="Reports Image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
