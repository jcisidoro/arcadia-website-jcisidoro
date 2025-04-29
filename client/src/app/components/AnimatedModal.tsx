"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@/app/components/ui/animated-modal";

type AnimatedModalProps = {
  isOpen: boolean;
  onClose: () => void;
  card: {
    title: string;
    src: string;
    description: ReactNode;
    description1: ReactNode;
    speakers: string;
    imageUrl: string;
    createdAt: string;
  } | null;
  resetSelectedCard: () => void;
};

const AnimatedModal: React.FC<AnimatedModalProps> = ({
  isOpen,
  onClose,
  card,
  resetSelectedCard,
}) => {
  if (!isOpen || !card) return null;

  return (
    <Modal>
      <ModalBody
        resetSelectedCard={resetSelectedCard}
        className="overflow-y-auto"
      >
        <ModalContent>
          <h2 className="text-6xl text-[#326333] font-bold font-cormorant">
            {card.title}
          </h2>
          <h4>{card.speakers}</h4>
          <div className="w-full h-96 relative">
            <Image
              unoptimized
              src={card.imageUrl}
              alt={card.title}
              className="rounded-lg my-4 object-cover"
              fill
            />
          </div>
          <div className="mt-10">{card.description}</div>
          <div className="mt-10">{card.description1}</div>
          <p className="text-black text-sm mt-10 font-bold">
            Created at:{" "}
            {new Date(card.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </ModalContent>
        <ModalFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#326333] rounded-md text-white cursor-pointer hover:scale-105 transition-all duration-100"
          >
            Close
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default AnimatedModal;
