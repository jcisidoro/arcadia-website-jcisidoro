import { FocusCards } from "@/app/components/ui/focus-cards";

export default function OpinionEditorials() {
  const cards = [
    {
      title: "The Future of Renewable Energy",
      author: "By Jane Doe",
      src: "/solarPanel.avif",
      description:
        "As the world shifts away from fossil fuels, renewable energy sources like solar and wind power are becoming more viable. But are we moving fast enough?",
      description1: (
        <p>
          Climate change is accelerating, and the need for clean energy is more
          urgent than ever. While investments in solar, wind, and hydropower are
          increasing, challenges such as infrastructure limitations and energy
          storage must be addressed.
          <strong> Governments and corporations must collaborate</strong> to
          ensure a sustainable future.
        </p>
      ),
    },
    {
      title: "Is AI a Threat to Journalism?",
      author: "By John Smith",
      src: "/robot.avif",
      description:
        "Artificial Intelligence is transforming the media landscape, but is it helping or harming journalism?",
      description1: (
        <p>
          AI-generated content is flooding the internet, raising concerns about
          misinformation and the future of human journalists.{" "}
          <em>
            While AI can assist in fact-checking and automation, it lacks the
            investigative depth and ethical judgment of professional reporters.
          </em>
          The key question remains: How do we balance AI&apos;s efficiency with
          journalistic integrity?
        </p>
      ),
    },
    {
      title: "Plastic Waste: Are We Doing Enough?",
      author: "By Emily Carter",
      src: "/plastic-waste.avif",
      description:
        "Despite global awareness, plastic waste continues to be a major problem. Are bans on single-use plastics enough",
      description1: (
        <p>
          Every year, millions of tons of plastic end up in landfills and
          oceans. <strong>While some countries have taken action</strong> by
          banning plastic bags and straws, others lag behind. The real challenge
          lies in creating a circular economy where plastic is reused rather
          than discarded.
        </p>
      ),
    },
    {
      title: "Can We Build Climate-Resilient Cities?",
      author: "By Michael Green",
      src: "/flooded-city.avif",
      description:
        "As extreme weather events become more common, urban planning must adapt. But are cities doing enough to become climate-resilient?",
      description1: (
        <p>
          Rising sea levels, heatwaves, and storms threaten urban areas.{" "}
          <strong>Smart city planning</strong> that integrates green
          infrastructure, renewable energy, and disaster preparedness is
          essential. The question is, will governments prioritize resilience
          over short-term economic gains?
        </p>
      ),
    },
    {
      title: "The Ethics of Space Exploration",
      author: "By Sarah Johnson",
      src: "/astronaut.avif",
      description:
        "Space exploration is expanding rapidly, but do we need ethical guidelines before colonizing other planets?",
      description1: (
        <p>
          With private companies racing to explore Mars, ethical concerns arise.{" "}
          <em>Who owns space?</em> What happens if we exploit extraterrestrial
          resources irresponsibly? As we push forward, it&apos;s crucial to
          establish policies that ensure responsible and equitable space
          exploration.
        </p>
      ),
    },
  ];

  return (
    <div className="w-full h-full bg-white mt-4 p-10 flex flex-col items-center gap-8">
      <h1 className="text-4xl lg:text-5xl xl:text-7xl font-cormorant font-bold text-[#326333]">
        Opinion Editorials
      </h1>
      <FocusCards cards={cards} />
    </div>
  );
}
