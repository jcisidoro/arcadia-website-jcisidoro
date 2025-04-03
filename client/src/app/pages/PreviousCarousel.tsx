"use client";

import Image from "next/image";
import { Carousel } from "../components/ui/carousel";
export function PreviousCarousel() {
  const slideData = [
    {
      title:
        "From Compliance to Circularity Bridging the Gap with EPR for Retail Plastics",
      button: "Explore Event",
      src: "/plastic-waste.avif",
      description: (
        <p className="text-justify">
          The event addresses the pressing issue of plastic waste in the
          Philippines, where only 9% of the 2.7 million tons of plastic waste
          generated annually is recycled. The retail sector significantly
          contributes to this problem, resulting in an estimated USD 790-890
          million in lost material value each year. In response, the goveernment
          has enacted the Extended Producer Responsibility (EPR) law, which
          mandates business to take responsibilty for their plastic wate through
          recovery schemes, waste collection hubs, and recycling initiatives.
          However, despite this legislation, challenges persist due to gaps in
          business and consumer practices, inadequate infrastructure, and the
          need for scalable solutions.
          <br />
          <br />
          The event aims to bring together key stakeholders-including government
          agencies, businesses, and sustainability advocates-to discuss the
          challenges and opportunities in implementing EPR. It seeks to foster
          collaboration, explore innovative waste management solutions, and
          encourage businesses to move beyond compliance toward a circular
          economy. Through discussions on policy, technology, and best
          practices, the event hopes to empower stakeholders with actionable
          insights to drive sustainable change in the retail industry.
        </p>
      ),
      description1: (
        <div className="flex flex-col gap-4 items-center">
          <div className="w-96 h-96 relative">
            <Image
              src="/buildForTomorrow.png"
              alt="Upcycle Workshop Image"
              className="object-fit"
              fill
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-bold">6 industry representatives</span>
              <span>
                namely from DENR, Quezon City LGU, PARMS, Plastic Bank, One
                Earth One Ocean, Coca-Cola
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">132 attendees</span>
              <span>
                retail, restaurant, waste managemet companies, and other
                sustainability practitioners
              </span>
            </div>
          </div>
        </div>
      ),
      author: "",
    },
    {
      title:
        "From Compliance to Circularity Bridging the Gap with EPR for Retail Plastics",
      button: "Explore Event",
      src: "/plastic.avif",
      description: (
        <p className="text-justify">
          The construction industry is responsible for a significant portion of
          waste in the Philippines, and the majority of this waste ends up in
          landfills, polluting our environment and harming public health. The
          issue is particularly pressing in urban areas such as Manila, Davao,
          Cebu and Iloilo, where construction is booming, and waste is piling
          up. This accounts for approximately 25% to 30% of the country&apos;s
          total solid waste generation. A report by the Asian Development Bank
          states that only about 40% of solid waste in the Philippines is
          collected, and much of it is dumped in uregulated landfills or open
          dumpsites.
          <br />
          <br />
          The campaign&apos;s objectives is to raise awareness and promote the
          use of eco-friendly materials, reducing waste, and recycling
          materials.
        </p>
      ),
      description1: (
        <div className="flex flex-col gap-4 items-center">
          <div className="w-96 h-96 relative">
            <Image
              src="/buildForTomorrow.png"
              alt="Upcycle Workshop Image"
              className="object-fit"
              fill
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-bold">7 industry representatives</span>
              <span>
                namely from Wilcon, Nomura Research Institute (NRI), WTA
                Architecture, PIXA Corporation, Innovaris Tech, PARMS, Evergreen
                Labs PH
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">40 attendees</span>
              <span>
                construction, real estate, waste management companies, and other
                sustainability practitioners
              </span>
            </div>
          </div>
        </div>
      ),
      author: "",
    },
    {
      title:
        "Build for Tomorrow! Shaping the Future of Construction through Sustainability",
      button: "Explore Event",
      src: "/solarPanel.avif",
      description: (
        <p className="text-justify">
          Unlocking the potential of climate finance for both adaptation and
          mitigation is a conversation we can&apos;t afford to miss. In a world
          grappling with the urgent realities of climate change, this article
          sheds light on why this blanced approach is essential. While much of
          our climate funding traditionally leans towards mitigation, it&apos;s
          high time we recognize the equal importance of adaptation to tackle
          the challenges already at our doorstep. <br />
          <br />
          If you&apos;re a passionate advocate for climate action, and curios
          about the financial dynamics that can shape our planet&apos;s future,
          click the link to delve deeper into this crucial discussion.
        </p>
      ),
      description1: (
        <div className="flex flex-col">
          <span>
            Source:{" "}
            <a
              href="https://www.weforum.org/stories/2022/11/climate-change-climate-adaptation-private-sector/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#326333] underline font-bold"
            >
              World Economic Forum: Climate adaptation: the $2 trillion market
              the private sector cannot ignore
            </a>
          </span>
        </div>
      ),
      author: "",
    },
    {
      title:
        "Deep Dive Dialogue: Municipal Zero Waste - Holistic Understanding of MSW in the Philippines, Pakistan, and China",
      button: "Explore Event",
      src: "/trashBin.avif",
      description: (
        <p className="text-justify">
          In today&apos;s world, the escalating volume of waste production
          presents a severe threat to our environment and human well-being.
          Annually, a staggering 11.2 billion pounds of solid waste burden our
          planet, with decaying organic matter significantly contributing to
          global greenhouse gas emmissions. This crisis is exacerbated by poor
          waste management, which encompasses issues ranging from air pollution
          to water and soil contamination, demanding immediate attention. <br />
          <br />
          To address these critical concerns, we&apos;ve gathered waste experts
          from the Philippines, Pakistan, and China. The aim for this event is
          to gain comprehensive insights into each country&apos;s municipal
          waste sector, encompassing system overviews, collection methods,
          challenges, effective policies, key stakeholders, and noteworthy
          success stories in both public and private initiatives. This
          collective knowledge fostered a dialogue among private-sector
          entitites, grassroots communities, and aspiring entrepreneurs,
          empowering them to grasp global waste challenges, discern best
          practices, and pinpoint promising opportunities within the waste
          sector.
        </p>
      ),
      description1: (
        <div className="flex flex-col gap-4 items-center">
          <div className="w-96 h-96 relative">
            <Image
              src="/municipalZeroWaste.png"
              alt="Upcycle Workshop Image"
              className="object-fit"
              fill
            />
          </div>
          <div className="flex flex-col gap-4">
            3 speakers from 3 different countries:{" "}
            <span className="font-bold">Phillipines, China, and Pakistan</span>
            <span className="font-bold">Speakers</span>
            <div className="flex flex-col">
              <span className="font-bold">
                Marian Frances Ledesma (Philippines)
              </span>
              <span className="italic">
                Zero Waste Capaigner at Greenpeace Southeast Asia
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Afia Salam (Pakistan)</span>
              <span>Chair at Indus Earth Trust</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Leo Zhao (China)</span>
              <span>
                Deputy General Manager at Dataway
                <br />
                Distinguished Researcher at Chinese Academy of Social Sciences
              </span>
            </div>
            <div className="">
              50 attendees from different countries (10 countries)
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Types of attendees:</span>
              <span>
                University reps, government reps, youth enthusiasts, young
                professionals in the sustainability industry
              </span>
            </div>
          </div>
        </div>
      ),
      author: "",
    },
    {
      title: "Deep Dive Dialogue: Towards a Zero Waste Nation",
      button: "Explore Event",
      src: "/turtle.avif",
      description: (
        <p className="text-justify">
          The region is grappling with with a mounting waste crisis,
          excarberated by the COVID-19 pandemic. While India, the Philippines,
          and Cambodia face open dumpsites and trash-lined streets, China,
          Singapore, and Japan have taken significant strides to combat this
          issue. <br />
          <br />
          China has instituted trash sorting policies, established large-scale
          recycling facilities, and enforced bans on single use products, all
          under the banner of the &ldquo;Zero-waste city&ldquo; initiative.
          Meanwhile, Singapore is actively curbing material consumption and
          championing reuse and recycling, and Japan, nearing carbon neutrality
          by 2030, is making remarkable progress through composting and
          recycling efforts. Our event brings together renowned speakers and
          change-makers from Singapore, China, and Japan, offering invaluable
          insights into waste management, including a deep dive into these
          countries&apos; waste markets, corporate strategies and innovative
          technologies propelling us toward a zero-waste future.
        </p>
      ),
      description1: (
        <div className="flex flex-col gap-4 items-center">
          <div className="w-96 h-96 relative">
            <Image
              src="/deepDive.png"
              alt="Upcycle Workshop Image"
              className="object-fit"
              fill
            />
          </div>
          <div className="flex flex-col gap-4">
            3 speakers from 3 different countries:{" "}
            <span className="font-bold">Singapore, Japan, and China</span>
            <span className="font-bold">Speakers</span>
            <div className="flex flex-col">
              <span className="font-bold">Akira Sakano</span>
              <span className="italic">
                Founder and Director of Zero Waste Japan
                <br />
                Co-founder of Green Innovator Academy
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Stephanie Vernede</span>
              <span>Co-founder and CEO of Enwise</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Karina Cady</span>
              <span>Managing Director of Nandina Partners</span>
            </div>
            <div className="">
              40 attendees from different countries (12 countries)
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Types of attendees:</span>
              <span>
                University reps, government reps, youth enthusiasts, young
                professionals in the sustainability industry
              </span>
            </div>
          </div>
        </div>
      ),
      author: "",
    },
    {
      title:
        "Upcycle Workshop: CHOPCHOP! Turning Single-Used Chopsticks into Art",
      button: "Explore Event",
      src: "/chopsticks.avif",
      description: (
        <p className="text-justify">
          Our dedicated volunteer team collected used chopsticks from local
          restaurants in Beijing&apos;s Central Business District, cleaned them
          meticulously, and provided them to event participants. Their creative
          challenge was to craft a sturdy table, demonstrating the potential of
          waste as a valuable resource.
          <br />
          <br />
          To wrap up our workshop on a high note, we hosted Illanit Yoel and
          Maxime Klooster, industry experts in waste management. They shared
          insights into the realities and challenges of waste recycling in China
          and offered actionable ways for individuals to contribute to
          sustainable solutions.
        </p>
      ),
      description1: (
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <div className="w-96 h-96 relative">
              <Image
                src="/upcycleWorkshop.png"
                alt="Upcycle Workshop Image"
                className="object-fit"
                fill
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            2 speakers from <span className="font-bold">Beijing, China</span>
            <span className="font-bold">Speakers</span>
            <div className="flex flex-col">
              <span className="font-bold">Maxime Van &apos;t Klooster</span>
              <span className="italic">Partner at Acclime Group</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Illanit Yoel</span>
              <span>Co-Founder at SDeCo China (by Shibolet Dagan)</span>
            </div>
            <div className="">35 youth enthusiast attendees</div>
            <div className="flex flex-col">
              <span className="font-bold">Types of attendees:</span>
              <span>Upcycle Workshop + Deep Dive Dialogue</span>
            </div>
          </div>
        </div>
      ),
      author: "",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
