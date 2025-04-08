"use client";

import { useEffect, useState } from "react";
import { Carousel, Card } from "@/app/components/ui/upcomingEventsCarousel";
import Image from "next/image";
import Link from "next/link";

// Define the type for events
interface EventItem {
  title: string;
  fromDate: string;
  src: string;
  eventAltImg: string;
  description: React.ReactNode;
  description1: React.ReactNode;
  speakers: string;
  imageUrl: string;
  eventLink: string;
  _id: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events`
        );
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const cards = events.map((item, index) => (
    <Card
      key={item._id}
      card={{
        category: "Event",
        title: item.title,
        src: item.imageUrl,
        content: (
          <div className="bg-[#0f9fa7]/10 dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <h3 className="text-xl">
              Speakers: <br />
              <span className="font-bold">{item.speakers}</span>
            </h3>
            <div className="w-full h-96 relative my-10">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <p className="text-xl text-justify">{item.description}</p>
            <p className="text-xl mt-6 text-justify">{item.description1}</p>
            <div className="w-full mt-10 flex flex-col gap-4">
              <span>Click here to join event</span>
              <Link
                href={item.eventLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="font-cormorant bg-[#326333] text-white text-2xl py-3 w-40 cursor-pointer hover:bg-[#326333]/80 transition-colors">
                  Join Event
                </button>
              </Link>
            </div>
          </div>
        ),
        fromDate: item.fromDate,
      }}
      index={index}
    />
  ));

  return (
    <div className="flex flex-col items-center w-full h-full relative bg-white mt-0.5">
      <h1 className="text-2xl lg:text-4xl xl:text-7xl font-bold uppercase mb-4 mt-8 text-[#326333] font-cormorant">
        Upcoming Events
      </h1>
      <div className="w-full h-full flex flex-col p-8">
        {events.length === 0 ? (
          <div className="text-xl text-black flex flex-col items-center justify-center w-full h-96 gap-4 text-center">
            <span className="font-cormorant text-4xl font-bold">
              Nothing to see here just yet, but check back soon!
            </span>
            <span className="font-cormorant text-3xl">
              Stay tuned for upcoming events!
            </span>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-10">
            <Carousel items={cards} />
          </div>
        )}
      </div>
    </div>
  );
}
