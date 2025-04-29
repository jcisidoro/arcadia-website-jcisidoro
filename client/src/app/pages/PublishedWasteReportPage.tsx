"use client";
import { FocusCards } from "@/app/components/ui/focus-cards";
import { useEffect, useState } from "react";

type WasteReports = {
  _id: string;
  title: string;
  speakers: string;
  description: string;
  description1: string;
  imageUrl: string;
  createdAt: string;
};

export default function PublishedWasteReportPage() {
  const [cards, setCards] = useState<WasteReports[]>([]);

  useEffect(() => {
    const fetchWasteReports = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/waste-reports`
        );
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching published waste reports:", error);
      }
    };

    fetchWasteReports();
  }, []);

  return (
    <div className="w-full h-full bg-white mt-0.5 p-10 flex flex-col items-center gap-8">
      <h1 className="text-4xl lg:text-5xl xl:text-7xl font-cormorant font-bold text-[#326333]">
        Published Waste Reports
      </h1>
      {cards.length === 0 ? (
        <div className="w-full h-96 flex items-center justify-center">
          <p className="text-black font-cormorant text-3xl font-semibold">
            No Published Waste Reports Available.
          </p>
        </div>
      ) : (
        <FocusCards
          showDownloadButton={true}
          cards={cards.map((wasteReports) => ({
            title: wasteReports.title,
            speakers: wasteReports.speakers,
            imageUrl: wasteReports.imageUrl,
            src: wasteReports.imageUrl,
            description: wasteReports.description,
            description1: wasteReports.description1,
            createdAt: wasteReports.createdAt,
          }))}
        />
      )}
    </div>
  );
}
