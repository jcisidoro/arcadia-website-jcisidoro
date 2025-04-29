"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@/app/components/ui/animated-modal";

import html2canvas from "html2canvas";
import { useRef } from "react";
import { jsPDF } from "jspdf";

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
  showDownloadButton?: boolean;
};

const AnimatedModal: React.FC<AnimatedModalProps> = ({
  isOpen,
  onClose,
  card,
  resetSelectedCard,
  showDownloadButton = false,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !card) return null;

  const handleDownload = async () => {
    if (!contentRef.current) return;

    const input = contentRef.current;
    const canvas = await html2canvas(input, {
      useCORS: true,
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${card.title}.pdf`);
  };

  return (
    <Modal>
      <ModalBody
        resetSelectedCard={resetSelectedCard}
        className="overflow-y-auto"
      >
        <ModalContent>
          <div ref={contentRef} className="bg-white p-4">
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
            <div className="my-10">{card.description1}</div>
            {showDownloadButton && (
              <p className="text-black text-sm font-bold">
                Created:{" "}
                {new Date(card.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            )}
          </div>
          {showDownloadButton && (
            <button
              onClick={handleDownload}
              className="bg-[#326333] rounded p-3 text-white hover:scale-105 duration-300 transition-all cursor-pointer w-56 mt-10 ml-4"
            >
              Download Content
            </button>
          )}
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
