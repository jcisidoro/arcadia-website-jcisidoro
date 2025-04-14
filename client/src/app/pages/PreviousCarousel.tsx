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
  toDate: string;
  fromDate: string;
}

export function PreviousCarousel() {
  const [slideData, setSlideData] = useState<SlideData[]>([]);

  // Fetch past events data from the backend
  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/past-events`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch past events");
        }
        const events = await response.json();

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
                <div className="flex flex-col">
                  <span>Speakers:</span>
                  <span className="font-bold">
                    {event.speakers || "No speakers"}
                  </span>
                </div>
                <span className="font-bold">
                  {event.attendees || "No attendees"}
                </span>
                <div className="flex gap-1">
                  <span>Start Date:</span>
                  <span className="font-bold">
                    {formatDate(event.fromDate) || "No start date specified."}
                  </span>
                </div>
                <div className="flex gap-1">
                  <span>End Date:</span>
                  <span className="font-bold">
                    {formatDate(event.toDate) || "No end date specified."}
                  </span>
                </div>
              </div>
            </div>
          ),
          imageUrl: event.imageUrl,
        }));

        setSlideData(formattedEvents);
      } catch (error) {
        console.error("Error fetching past events:", error);
      }
    };

    fetchPastEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const fromDate = new Date(dateString);
    return fromDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <div className="relative overflow-hidden w-full h-full py-5">
      {slideData.length === 0 ? (
        <div className="flex items-center justify-center w-full h-96 text-4xl font-bold text-black font-cormorant text-center">
          No past events displayed
        </div>
      ) : (
        <Carousel slides={slideData} />
      )}
    </div>
  );
}
