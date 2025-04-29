"use client";
import { FocusCards } from "@/app/components/ui/focus-cards";
import { useEffect, useState } from "react";

type Opinion = {
  _id: string;
  title: string;
  speakers: string;
  description: string;
  description1: string;
  imageUrl: string;
  createdAt: string;
};

export default function OpinionEditorials() {
  const [cards, setCards] = useState<Opinion[]>([]);

  useEffect(() => {
    const fetchOpinion = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/opinions`
        );
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching opinions editorials:", error);
      }
    };

    fetchOpinion();
  }, []);

  return (
    <div className="w-full h-full bg-white mt-0.5 p-10 flex flex-col items-center gap-8">
      <h1 className="text-4xl lg:text-5xl xl:text-7xl font-cormorant font-bold text-[#326333]">
        Opinion Editorials
      </h1>
      {cards.length === 0 ? (
        <div className="w-full h-96 flex items-center justify-center">
          <p className="text-black font-cormorant text-3xl font-semibold">
            No Opinion Editorials Available.
          </p>
        </div>
      ) : (
        <FocusCards
          showDownloadButton={true}
          cards={cards.map((opinion) => ({
            title: opinion.title,
            speakers: opinion.speakers,
            imageUrl: opinion.imageUrl,
            src: opinion.imageUrl,
            description: opinion.description,
            description1: opinion.description1,
            createdAt: opinion.createdAt,
          }))}
        />
      )}
    </div>
  );
}
