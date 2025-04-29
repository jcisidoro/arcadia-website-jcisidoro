"use client";
import { FocusCards } from "@/app/components/ui/focus-cards";
import { useEffect, useState } from "react";

type Solutions = {
  _id: string;
  title: string;
  speakers: string;
  description: string;
  description1: string;
  imageUrl: string;
  createdAt: string;
};

export function SolutionsPageCards() {
  const [cards, setCards] = useState<Solutions[]>([]);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/solutions`
        );
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching solutions editorials:", error);
      }
    };

    fetchSolutions();
  }, []);

  return (
    <>
      {cards.length === 0 ? (
        <div className="w-full h-96 flex items-center justify-center">
          <p className="text-black font-cormorant text-3xl font-semibold">
            No Solutions Available.
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
    </>
  );
}
