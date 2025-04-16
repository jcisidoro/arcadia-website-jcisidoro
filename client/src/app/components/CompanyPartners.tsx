"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuHeartHandshake } from "react-icons/lu";
import { FileUploadDemo } from "./FileUpload";
import { useToast } from "./provider/ToastContext";

type PartnerType = {
  id: string;
  imageUrl: string;
  description: string;
};

export default function CompanyPartners() {
  const { showToast } = useToast();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const [selectedPartners, setSelectedPartners] = useState<PartnerType | null>(
    null
  );

  const [resetKey, setResetKey] = useState(0);

  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/partners`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setPartners(data);
        } else {
          console.error("Unexpected response format:", data);
          showToast("Error fetching company partners", "error");
        }
      } catch (error) {
        console.error("Error company partners:", error);
        showToast("Error fetching company partners", "error");
      }
    };

    fetchPartners();
  }, []);

  // Select an partner to edit
  const handleSelectPartner = (partners: PartnerType) => {
    setSelectedPartners(partners);
    setDescription(partners.description);
    setImageFile(null);
    setResetKey((prev) => prev + 1);
  };

  // Submit new data
  const handleSubmit = async () => {
    if (!description.trim() || !imageFile) {
      showToast("Image and description are required", "info");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", imageFile);

    const url = selectedPartners
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/partners/${selectedPartners.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/partners`;

    const method = selectedPartners ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        showToast(
          selectedPartners ? "Partner updated!" : "New partner added!",
          "success"
        );

        // Update local state
        if (selectedPartners) {
          setPartners((prev) =>
            prev.map((partner) =>
              partner.id === result.partner.id ? result.partner : partner
            )
          );
        } else {
          setPartners((prev) => [...prev, result.partner]);
        }

        // Reset form state
        setSelectedPartners(null);
        setImageFile(null);
        setDescription("");
        setResetKey((prev) => prev + 1);
      } else {
        console.error("Failed to submit", result);
        showToast("Failed to submit", "error");
      }
    } catch (err) {
      console.error("Error submitting", err);
      showToast("Error submitting", "error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-[#326333] p-4 rounded xl:items-center overflow-y-auto gap-10">
      <div className="flex flex-col w-full lg:w-2/5 h-96 md:h-full bg-white/50 rounded p-4 overflow-y-auto">
        <div className="flex flex-col w-full h-auto gap-4">
          <h1 className="flex items-center gap-1 text-white font-medium">
            <LuHeartHandshake size={24} />
            Manage Company Partners
          </h1>

          <FileUploadDemo
            onChange={(file: File) => setImageFile(file)}
            resetKey={resetKey}
            key={resetKey}
            existingImageUrl={selectedPartners?.imageUrl || null}
          />

          <div className="flex w-full h-40 bg-white rounded">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-full p-4 resize-none"
              placeholder="Company Partners Description"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#326333] hover:bg-[#326333]/80 rounded text-neutral-100 cursor-pointer hover:scale-105 transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="grid w-full h-[650px] lg:h-full overflow-y-auto gap-4 p-0 lg:px-4">
        {partners.map((partner, index) => (
          <div
            key={partner.id || index}
            className={`flex flex-col lg:flex-row gap-2 w-full ${
              selectedPartners?.id === partner.id ? "bg-white/50" : ""
            } h-64 lg:h-56 rounded p-2 cursor-pointer`}
            onClick={() => handleSelectPartner(partner)}
          >
            <div className="w-full h-full relative bg-white rounded overflow-hidden">
              <Image
                unoptimized
                src={partner.imageUrl}
                alt="Company Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex w-full h-full bg-white rounded">
              <textarea
                className="w-full p-4 resize-none overflow-hidden"
                value={partner.description}
                disabled
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPartner(partner);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
