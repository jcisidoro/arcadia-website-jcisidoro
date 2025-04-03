import Image from "next/image";

export default function CampaignsPage() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full lg:h-[750px] bg-white mt-4 p-4 lg:p-10 items-center gap-10">
      <div className="w-[300px] sm:w-[600px] lg:w-full h-[250px] sm:h-[300px] lg:h-[450px] relative">
        <Image
          src="/hackathons.avif"
          alt="Hackathon Image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col w-full h-full gap-10 p-4 text-right">
        <h1 className="text-4xl lg:text-5xl xl:text-7xl font-cormorant font-bold text-[#326333]">
          Hackathons and Campaigns
        </h1>

        <p className="text-sm lg:text-lg xl:text-2xl flex-1 text-justify">
          <span className="font-bold font-cormorant text-xl xl:text-[35px]">
            Arcadia{" "}
          </span>{" "}
          organizes hackathons and campaign-driven events designed to bring
          together innovative minds and passionate advocates to solve real-world
          sustainability challenges. These immersive, hands-on sessions invite
          companies, young leaders, and experts to collaborate in developing
          creative solutions while aligning with corporate sustainability goals
          and advocacy efforts. Through these events, we foster the rapid
          prototyping of ideas, accelerate problem-solving, and drive the
          development of actionable strategies for environmental and social
          impact.
        </p>

        <span className="text-sm lg:text-lg xl:text-2xl font-semibold">
          Hackathons, Workshops and Trainings
        </span>
      </div>
    </div>
  );
}
