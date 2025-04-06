import Link from "next/link";
import { IoIosArrowDroprightCircle } from "react-icons/io";

export default function ArcadiaComponents() {
  return (
    <div className="flex flex-col w-full h-full xl:h-[500px] bg-white p-10 gap-4">
      <h1 className="font-bold font-cormorant text-4xl lg:text-6xl text-[#326333]">
        Three Key Components
      </h1>

      <p className="text-lg lg:text-xl text-justify text-black">
        Arcadia&apos;s methodology revolves around fostering a continuous cycle
        of dialogue, knowledge sharing, and innovation, to empower stakeholders
        and drive meaningful sustainability outcomes. Our key pillars include:
      </p>

      <ol className="flex flex-col lg:flex-row mt-4 gap-10">
        {[
          {
            title: "Events",
            description:
              "Deep dive dialogues, summits, and touchpoints that bridge stakeholders and generate sustainable ideas.",
            btnText: "Learn More",
            href: "/pages/events",
          },
          {
            title: "Knowledge Portal",
            description:
              "A repository of market insights, sector reports, policy papers, and narratives that empower informed decision-making.",
            btnText: "Learn More",
            href: "/pages/publications",
          },
          {
            title: "Innovation and Solutions Exchange",
            description:
              "Flagship papers and pilot programs that deliver real-world solutions, advancing circular economy practices in the business.",
            btnText: "Learn More",
            href: "#",
          },
        ].map((item, index) => (
          <li key={index} className="flex flex-col gap-8 mt-4 text-black">
            <h1 className="font-bold text-2xl">{item.title}</h1>
            <p className="text-lg flex-1 text-justify">{item.description}</p>
            <Link href={item.href}>
              <button className="w-32 lg:w-40 text-sm lg:text-lg border p-3 lg:p-4 cursor-pointer group relative">
                {item.btnText}
                <div className="w-full h-full scale-x-0 origin-left bg-[#326333] group-hover:scale-x-100 transition-all duration-300 absolute top-0 left-0 flex justify-center items-center">
                  <span className="text-white text-4xl">
                    <IoIosArrowDroprightCircle className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
                  </span>
                </div>
              </button>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
