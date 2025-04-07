export default function Projects() {
  return (
    <div className="flex flex-col w-full h-full lg:h-[800px] bg-white mt-0.5 p-10 gap-4">
      <h1 className="text-lg xl:text-5xl uppercase text-black">
        <span className="font-bold">Flagship </span>Projects
      </h1>
      <p className="text-lg xl:text-2xl text-justify text-black">
        Our flagship projects bring together key stakeholders to address
        pressing waste challenges through collaborative dialogue and innovation.
        By assesing on-the-ground realities and identifying gaps, we harness
        feedback, insights, and our network of experts to develop actionable
        frameworks. These initiatives provide practical, scalable solutions and
        recommendations for companies and communities to effectively tackle
        waste management issues, fostering sustainable change and advancing
        circular economy practices.
      </p>

      <div className="flex flex-col md:flex-row w-full h-full items-center justify-center gap-8 lg:gap-32">
        <div className="flex flex-col justify-center gap-10 bg-gradient-to-r from-[#0a9cab] via-[#3db789] to-[#7ed55f] w-60 xl:w-96 h-60 xl:h-80 rounded-xl p-10">
          <h1 className="text-white text-2xl xl:text-4xl uppercase font-bold">
            Plastic Pathways
          </h1>
          <p className="text-white text-lg xl:text-2xl font-bold italic">
            Leading the Way in Plastic Reuse & Reduction
          </p>
        </div>
        <div className="flex flex-col justify-center gap-10 bg-gradient-to-r from-[#8568fb] via-[#6fa8f0] to-[#61dde5] w-60 xl:w-96 h-60 xl:h-80 rounded-xl p-10 lg:self-end">
          <h1 className="text-white text-2xl xl:text-4xl uppercase font-bold">
            Techcycle
          </h1>
          <p className="text-white text-lg xl:text-2xl font-bold italic">
            Closing the Loop on E-Waste
          </p>
        </div>
        <div className="flex flex-col justify-center gap-10 bg-gradient-to-r from-[#231a04] via-[#50390c] to-[#986f11] w-60 xl:w-96 h-60 xl:h-80 rounded-xl p-10">
          <h1 className="text-white text-2xl xl:text-4xl uppercase font-bold">
            Food Forward
          </h1>
          <p className="text-white text-lg xl:text-2xl font-bold italic">
            From Food Waste to Resource
          </p>
        </div>
      </div>
    </div>
  );
}
