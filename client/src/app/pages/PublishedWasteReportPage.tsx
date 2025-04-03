import { FocusCards } from "@/app/components/ui/focus-cards";

export default function PublishedWasteReportPage() {
  const cards = [
    {
      title:
        "The Global Plastic Crisis: Challenges, Innovations, and Policy Solutions",
      author: "Environmental Research Institute",
      src: "/recycle.avif",
      description:
        "A comprehensive report on the escalating plastic waste problem, its devastating effects on ecosystems, and the urgent need for sustainable solutions.",
      description1: (
        <ul className="list-disc pl-5">
          <li>
            Plastic pollution has reached alarming levels, with over 300 million
            tons produced annually, much of it ending up in oceans and
            landfills.
          </li>
          <li>
            Only 9% of plastic waste is properly recycled, highlighting
            inefficiencies in global waste management systems.
          </li>
          <li>
            Microplastics are now found in human bloodstreams, raising concerns
            about long-term health effects.
          </li>
          <li>
            Major policy initiatives, such as the EU&apos;s Single-Use Plastic
            Ban and global extended producer responsibility (EPR) programs, are
            gaining traction.
          </li>
          <li>
            Innovations in biodegradable plastics and advanced recycling
            technologies offer promising solutions but require widespread
            adoption.
          </li>
        </ul>
      ),
    },
    {
      title: "Food Waste and Sustainability: Turning Waste Into Opportunity",
      author: "Global Sustainability Initiative",
      src: "/fertilizer.avif",
      description:
        "An in-depth study on the impact of food waste on global sustainability and how businesses, governments, and individuals can drive meaningful change.",
      description1: (
        <ul className="list-disc pl-5">
          <li>
            1.3 billion tons of food are wasted each year, accounting for nearly
            one-third of all food produced globally.
          </li>
          <li>
            Food waste is a leading contributor to climate change, responsible
            for 8-10% of global greenhouse gas emissions.
          </li>
          <li>
            Developing countries face food distribution challenges, while
            industrialized nations struggle with overconsumption and waste.
          </li>
          <li>
            Innovative solutions, such as AI-driven inventory management,
            surplus food redistribution programs, and composting initiatives,
            are proving effective.
          </li>
          <li>
            Legislation like France&apos;s supermarket food waste ban is setting
            a global precedent for tackling the issue at the policy level.
          </li>
        </ul>
      ),
    },
    {
      title: "From Waste to Energy: Transforming Trash Into Renewable Power",
      author: "Energy & Environment Report 2024",
      src: "/landfill.avif",
      description:
        "An analysis of how waste-to-energy (WTE) technologies are reshaping global energy markets by converting garbage into usable power.",
      description1: (
        <ul className="list-disc pl-5">
          <li>
            Waste-to-energy plants produce over 500 terawatt-hours of
            electricity annually, enough to power millions of homes worldwide.
          </li>
          <li>
            Advanced incineration technology reduces landfill waste by up to
            90%, significantly cutting methane emissions.
          </li>
          <li>
            Biogas from organic waste is emerging as a key renewable energy
            source, reducing reliance on fossil fuels.
          </li>
          <li>
            Countries like Sweden have nearly eliminated landfills by adopting
            waste-to-energy solutions and circular economy principles.
          </li>
          <li>
            Challenges remain in public perception and emissions control, but
            innovations in carbon capture make WTE a cleaner alternative.
          </li>
        </ul>
      ),
    },
    {
      title:
        "Building Climate-Resilient Cities: Strategies for a Sustainable Future",
      author: "UN Climate Resilience Report",
      src: "/housing.avif",
      description:
        "A detailed look at how urban areas can adapt to climate change by integrating sustainable infrastructure and disaster preparedness strategies.",
      description1: (
        <ul className="list-disc pl-5">
          <li>
            Rising global temperatures and extreme weather events are putting
            cities at risk, with flooding, heatwaves, and storms becoming more
            frequent.
          </li>
          <li>
            Flood-resistant infrastructure, such as permeable pavements and
            elevated buildings, can reduce damage by 30%.
          </li>
          <li>
            Smart city planning integrates renewable energy, green spaces, and
            resilient transportation systems to future-proof urban areas.
          </li>
          <li>
            Early warning systems improve evacuation times by 40%, significantly
            reducing disaster-related casualties.
          </li>
          <li>
            Major global cities like Tokyo and Amsterdam are leading the way in
            implementing climate adaptation strategies.
          </li>
        </ul>
      ),
    },
  ];

  return (
    <div className="w-full h-full bg-white mt-2 p-10 flex flex-col items-center gap-8">
      <h1 className="text-4xl lg:text-5xl xl:text-7xl font-cormorant font-bold text-[#326333]">
        Published Waste Reports
      </h1>
      <FocusCards cards={cards} />
    </div>
  );
}
