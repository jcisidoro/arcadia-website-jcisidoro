"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuHeartHandshake } from "react-icons/lu";
import { FileUploadDemo } from "./FileUpload";
import { useToast } from "./provider/ToastContext";
import { useIsMobile } from "@/app/components/hooks/useIsMobile";
import { PartnersModal } from "./modals/PartnersModal";

type PartnerType = {
  id: string;
  imageUrl: string;
  description: string;
  isDeleted?: boolean;
};

export default function CompanyPartners() {
  const { showToast } = useToast();
  const isMobile = useIsMobile();

  const [modalOpen, setModalOpen] = useState(false);

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
        const activePartners = data.filter((p: PartnerType) => !p.isDeleted);
        setPartners(activePartners);
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

    if (isMobile) {
      setModalOpen(true);
    }
  };

  // Clear fields
  const handleClear = () => {
    setSelectedPartners(null);
    setImageFile(null); // Clear the image file
    setDescription(""); // Clear the description
    setResetKey((prev) => prev + 1); // Reset the file input field
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
      : `/api/partners/createPartner`;

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
        console.error("Server response:", result);
        throw new Error(result.message || "Failed to submit");
      }

      showToast(
        isEditing ? "Partner updated!" : "New partner added!",
        "success"
      );

      await fetchPartners();

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

  const handleSoftDelete = async () => {
    if (!selectedPartners) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/partners/${selectedPartners.id}/softDelete`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Soft delete failed");

      showToast("Partner archived", "success");
      setSelectedPartners(null);
      setDescription("");
      setImageFile(null);
      setResetKey((prev) => prev + 1);
      fetchPartners(); // refresh the list to exclude soft-deleted partners
    } catch (error) {
      console.error("Soft delete failed:", error);
      showToast("Error archiving partner", "error");
    }
  };
  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-[#326333] p-4 rounded gap-4 overflow-y-auto">
      {/* FIRST */}
      <div className="hidden lg:flex flex-col w-full lg:w-1/3 h-96 lg:h-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="flex items-center gap-1 text-white font-medium text-sm p-4">
            <LuHeartHandshake size={24} />
            Manage Company Partners
          </h1>
          <button
            onClick={handleClear}
            className="bg-white/50 w-16 h-8 rounded text-white text-sm cursor-pointer hover:scale-105 transition-all duration-300"
          >
            Clear
          </button>
        </div>
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
            onClick={handleSoftDelete}
            disabled={!selectedPartners}
            className="px-4 py-2 bg-red-500/90 hover:bg-red-500/70 rounded text-neutral-100 cursor-pointer hover:scale-105 transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
      {/*  */}

      {/* MOBILE MODAL */}
      {isMobile && (
        <PartnersModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          partner={selectedPartners}
          description={description}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
          handleClear={handleClear}
          handleSoftDelete={handleSoftDelete}
          resetSelectedCard={handleClear}
        />
      )}

      {/*  */}

      {/* SECOND */}
      <div className="flex flex-col w-full lg:w-2/3 h-96 lg:h-full overflow-y-auto">
        <h1 className="flex text-white items-center font-medium p-4">
          Select Partners to Edit
        </h1>
        <div className="flex flex-col gap-2 w-full h-full overflow-y-auto bg-white/50 rounded p-4 break-words whitespace-pre-wrap">
          {partners.map((partner, index) => (
            <div
              key={partner.id || index}
              className={`flex flex-col lg:flex-row gap-2 w-full h-56 rounded p-2 cursor-pointer`}
              onClick={() => handleSelectPartner(partner)}
            >
              <div className="flex w-full h-48 relative bg-white rounded overflow-hidden">
                <Image
                  unoptimized
                  src={partner.imageUrl}
                  alt="Company Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden lg:flex w-full h-48 bg-white rounded break-all">
                <div className="flex w-full p-4 overflow-hidden">
                  {partner.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*  */}
    </div>
  );
}
