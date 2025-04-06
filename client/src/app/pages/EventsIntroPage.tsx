import Image from "next/image";

export default function EventsIntroPage() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full xl:h-[550px] bg-white p-4 lg:p-10 items-center gap-10">
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
          Deep Dive Dialogues
        </h1>

        <p className="text-sm lg:text-lg xl:text-2xl flex-1 text-justify text-black">
          Our Deep Dive Dialogue sessions are structured discussions designed to
          encourage stakeholders to share their insights and experiences on the
          challenges and opportunities in sustainability. The sessions will
          focus on sharing on-the-ground challenges, case studies, good and bad
          practices, as well as solutions, technologies, and best practices
          adopted by other countries.
        </p>

        <span className="text-sm lg:text-lg xl:text-2xl font-semibold text-black">
          Forums, Panel Discussions, Fireside Chats, Summits
        </span>
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
