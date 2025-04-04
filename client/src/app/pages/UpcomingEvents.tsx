"use client";

import EventCards from "@/app/components/EventCards";
import { useEffect, useState } from "react";
import { useModal } from "@/app/components/ui/animated-modal";
import AnimatedModal from "@/app/components/AnimatedModal";

// Define the type for events
interface EventItem {
  title: string;
  date: string;
  src: string;
  eventAltImg: string;
  description: React.ReactNode;
  description1: React.ReactNode;
  speakers: string;
  imageUrl: string;
  _id: string;
}

export default function UpcomingEvents() {
  const { open, setOpen } = useModal();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null); // Store selected event
  const [events, setEvents] = useState<EventItem[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3100/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleOpenModal = (event: EventItem) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const resetSelectedCard = () => {
    setSelectedEvent(null);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full h-full lg:h-[550px] relative bg-white mt-0.5">
      <h1 className="text-2xl lg:text-4xl xl:text-7xl font-bold uppercase mb-4 mt-8 text-[#326333] font-cormorant">
        Upcoming Events Soon
      </h1>
      <div className="w-full h-full flex flex-col p-8">
        {events.length === 0 ? (
          <div className="text-xl text-black flex flex-col items-center justify-center w-full h-full gap-4">
            <span className="font-cormorant text-4xl">
              Nothing to see here just yet, but check back soon!
            </span>
            <span className="font-cormorant text-3xl">
              Stay tuned for upcoming events!
            </span>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-10">
            {events.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <span className="text-sm md:text-lg lg:text-2xl">
                  {item.title}
                </span>

                <EventCards
                  src={item.imageUrl}
                  eventAltImg={item.eventAltImg}
                  description={item.description}
                  description1={item.description1}
                  author={item.speakers}
                  onClick={() => handleOpenModal(item)}
                />
                <div className="text-sm lg:text-xl">
                  <span>Join us on - </span>
                  <span className="font-semibold">{formatDate(item.date)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
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
