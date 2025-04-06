"use client";

import Image from "next/image";
import { Carousel } from "../components/ui/previousEventsCarousel";
import { useState, useEffect } from "react";

// Define the SlideData interface to match the event data format.
interface SlideData {
  title: string;
  button: string;
  src: string;
  description: React.ReactNode;
  description1: React.ReactNode;
  attendees: string;
  imageUrl: string;
  speakers: string;
}

export function PreviousCarousel() {
  const [slideData, setSlideData] = useState<SlideData[]>([]);

  // Fetch past events data from the backend
  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const response = await fetch("http://localhost:3100/api/past-events");
        if (!response.ok) {
          throw new Error("Failed to fetch past events");
        }
        const events = await response.json();

        // Format the data as needed for the carousel
        const formattedEvents = events.map((event: SlideData) => ({
          title: event.title,
          button: "Explore Event",
          src: event.imageUrl,
          description: (
            <p className="text-justify">
              {event.description || "No description available."}
            </p>
          ),
          description1: (
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <div className="w-full h-96 relative">
                  <Image
                    unoptimized
                    src={event.imageUrl}
                    alt="Event Image"
                    className="object-cover rounded-lg"
                    fill
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-bold">
                  {event.speakers || "No speakers"}
                </span>
                <span>{event.attendees || "No attendees"}</span>
              </div>
            </div>
          ),
          speakers: event.speakers || "No speakers",
          imageUrl: event.imageUrl,
        }));

        setSlideData(formattedEvents);
      } catch (error) {
        console.error("Error fetching past events:", error);
      }
    };

    fetchPastEvents();
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      {slideData.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full text-4xl font-bold text-black font-cormorant text-center">
          No past events displayed
        </div>
      ) : (
        <Carousel slides={slideData} />
      )}
    </div>
  );
}
