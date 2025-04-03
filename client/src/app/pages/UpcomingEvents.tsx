"use client";

import EventCards from "@/app/components/EventCards";
import { useState } from "react";
import { useModal } from "@/app/components/ui/animated-modal";
import AnimatedModal from "@/app/components/AnimatedModal";

// Define the type for events
interface EventItem {
  title: string;
  text: string;
  src: string;
  eventAltImg: string;
  description: React.ReactNode;
  description1: React.ReactNode;
  author: string;
}

export default function UpcomingEvents() {
  const { open, setOpen } = useModal();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null); // Store selected event

  const handleOpenModal = (event: EventItem) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const resetSelectedCard = () => {
    setSelectedEvent(null);
    setOpen(false);
  };

  const events: EventItem[] = [
    {
      title: "Weekly Impact Mixer",
      text: "01.23.2025",
      src: "/impactMixerImg.png",
      eventAltImg: "Impact Mixer Event Image",
      description:
        "Join our weekly impact mixer and network with like-minded individuals.",
      description1: (
        <div className="flex flex-col w-full">
          Discuss sustainability, innovation, and community impact.
          <div className="flex flex-col mt-10">
            <span className="font-cormorant text-lg">
              Click here to join the event
            </span>
            <button className="bg-[#326333] w-40 font-cormorant text-white text-xl p-2 cursor-pointer">
              Join Event
            </button>
          </div>
        </div>
      ),
      author: "Impact Club",
    },
    {
      title: "Plastic Pathways",
      text: "02.10.2025",
      src: "/bottles.avif",
      eventAltImg: "Plastic Pathways Event Image",
      description:
        "Learn about plastic waste management and recycling solutions.",
      description1: (
        <div className="flex flex-col w-full">
          Engage with experts and volunteers making a difference.
          <div className="flex flex-col mt-10">
            <span className="font-cormorant text-lg">
              Click here to join the event
            </span>
            <button className="bg-[#326333] w-40 font-cormorant text-white text-xl p-2 cursor-pointer">
              Join Event
            </button>
          </div>
        </div>
      ),
      author: "Eco Foundation",
    },
  ];

  return (
    <div className="flex w-full h-full lg:h-[550px] relative bg-white mt-0.5">
      <div className="w-full h-full flex flex-col items-center p-8">
        <h1 className="text-2xl lg:text-4xl xl:text-7xl font-bold uppercase mb-4 text-[#326333] font-cormorant">
          Upcoming Events Soon
        </h1>
        <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-10">
          {events.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <span className="text-sm lg:text-xl">{item.title}</span>
              <EventCards
                src={item.src}
                eventAltImg={item.eventAltImg}
                description={item.description}
                description1={item.description1}
                author={item.author}
                onClick={() => handleOpenModal(item)}
              />
              <span className="text-sm lg:text-xl">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - Show only when open */}
      {open && selectedEvent && (
        <AnimatedModal
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setSelectedEvent(null);
          }}
          card={selectedEvent}
          resetSelectedCard={resetSelectedCard}
        />
      )}
    </div>
  );
}
