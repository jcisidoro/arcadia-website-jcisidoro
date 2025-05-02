"use client";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";
import { useModal } from "@/app/components/ui/animated-modal";
import AnimatedModal from "../modals/AnimatedModal";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onClick,
  }: {
    card: Card;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onClick: () => void;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={onClick} // Open modal on click
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-80 xl:h-[350px] w-full transition-all duration-300 ease-out cursor-pointer",
        hovered !== null && hovered !== index && "lg:blur-xs lg:scale-[0.98]"
      )}
    >
      <Image
        unoptimized
        src={card.src}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/20 lg:bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-100 lg:opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium text-white bg-black/50 p-2 lg:bg-transparent lg:p-0">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  description: ReactNode;
  description1: ReactNode;
  speakers: string;
  imageUrl: string;
  createdAt: string;
};

export function FocusCards({
  cards,
  showDownloadButton = false,
}: {
  cards: Card[];
  showDownloadButton?: boolean;
}) {
  const { open, setOpen } = useModal();
  const [hovered, setHovered] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [open]);

  return (
    <>
      {/* Cards */}
      <div className="flex flex-col lg:flex-row gap-6 xl:gap-10 max-w-[2000px] mx-auto md:px-4 w-full">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            onClick={() => {
              setSelectedCard(null); // Reset previous selection
              setTimeout(() => {
                setSelectedCard(card); // Set new card after state reset
                setOpen(true); // Open modal
              }, 0);
            }}
          />
        ))}
      </div>

      {/* Modal Section */}
      {open && selectedCard && (
        <AnimatedModal
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setSelectedCard(null);
          }}
          card={selectedCard}
          resetSelectedCard={() => setSelectedCard(null)}
          showDownloadButton={showDownloadButton}
        />
      )}
    </>
  );
}
