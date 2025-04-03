import { SolutionsPageCards } from "./SolutionsPageCards";

export default function ArcadiaSolutionsPage() {
  return (
    <div className="flex flex-col gap-4 w-full h-full bg-white mt-2 p-10">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <h1 className="text-4xl lg:text-6xl text-[#326333] font-cormorant font-bold">
          Our Focus in the Philippines Context
        </h1>
        <span className="text-lg lg:text-xl mt-4 lg:mt-0">
          Local Challenges, Circular Solutions
        </span>
      </div>

      <p className="text-lg lg:text-xl text-justify">
        In the Philippines, we focus on five interconnected pillars that are
        critical to advancing a circular economy and building climate
        resilience.
      </p>

      <div className="w-full h-full flex items-center mt-8">
        <SolutionsPageCards />
      </div>
    </div>
  );
}
