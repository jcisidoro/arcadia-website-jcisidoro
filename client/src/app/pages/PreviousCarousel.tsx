"use client";

import Image from "next/image";
import { Carousel } from "../components/ui/previousEventsCarousel";
export function PreviousCarousel() {
  const slideData = [
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
      speakers: "",
      imageUrl: "/chopsticks.avif",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
