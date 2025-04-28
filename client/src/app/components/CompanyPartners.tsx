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

  useEffect(() => {
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
    const isEditing = Boolean(selectedPartners);

    if (!description.trim() || (!isEditing && !imageFile)) {
      showToast("Image and description are required", "info");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const endpoint = isEditing
      ? `/api/partners/${selectedPartners?.id}`
      : `/api/partners`;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          method: isEditing ? "PATCH" : "POST",
          body: formData,
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit");
      }

      showToast(
        isEditing ? "Partner updated!" : "New partner added!",
        "success"
      );

      await fetchPartners();

      setPartners((prev) =>
        isEditing
          ? prev.map((partner) =>
              partner.id === result.partner.id ? result.partner : partner
            )
          : [...prev, result.partner]
      );

      // Reset form
      setSelectedPartners(null);
      setImageFile(null);
      setDescription("");
      setResetKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error submitting:", error);
      showToast("Error submitting", "error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-[#326333] p-4 rounded gap-4 overflow-y-auto">
      <div className="flex flex-col w-full lg:w-[500px] h-auto md:h-[650px] lg:h-full">
        <h1 className="flex items-center gap-1 text-white font-medium p-4">
          <LuHeartHandshake size={24} />
          Manage Company Partners
        </h1>
        <div className="flex flex-col w-full h-full gap-4 bg-white/50 p-4 rounded overflow-y-auto">
          <FileUploadDemo
            onChange={(file: File) => setImageFile(file)}
            resetKey={resetKey}
            key={resetKey}
            existingImageUrl={selectedPartners?.imageUrl || null}
          />
          <div className="flex w-full h-full bg-white rounded">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-64 lg:h-80 p-4 resize-none text-justify"
              placeholder="Company Partners Description"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#326333] hover:bg-[#326333]/80 rounded text-neutral-100 cursor-pointer hover:scale-105 transition-all duration-300"
          >
            Submit
          </button>
          <button
            disabled
            className="px-4 py-2 bg-red-500/90 hover:bg-red-500/70 rounded text-neutral-100 cursor-pointer hover:scale-105 transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full h-[650px] lg:h-full">
        <h1 className="flex text-white items-center font-medium p-4">
          Select Partners to Edit
        </h1>
        <div className="flex flex-col w-full h-full gap-4 bg-white/50 p-4 rounded overflow-y-auto">
          {partners.map((partner, index) => (
            <div
              key={partner.id || index}
              className={`flex flex-col lg:flex-row gap-2 w-full h-64 rounded p-2 cursor-pointer`}
              onClick={() => handleSelectPartner(partner)}
            >
              <div className="flex w-full h-full relative bg-white rounded overflow-hidden">
                <Image
                  unoptimized
                  src={partner.imageUrl}
                  alt="Company Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden lg:flex w-full h-full bg-white rounded">
                <div className="w-full p-4 resize-none overflow-hidden">
                  {partner.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
