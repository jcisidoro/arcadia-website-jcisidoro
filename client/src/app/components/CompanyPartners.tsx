"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuHeartHandshake } from "react-icons/lu";
import { useToast } from "./provider/ToastContext";
import { useIsMobile } from "@/app/components/hooks/useIsMobile";
import { PartnersModal } from "./modals/PartnersModal";
import { PartnerForm } from "./forms/PartnersForm";

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
  const [selectedPartner, setSelectedPartner] = useState<PartnerType | null>(
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
        showToast("Error fetching company partners", "error");
      }
    } catch (error) {
      showToast("Error fetching company partners", "error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSelectPartner = (partner: PartnerType) => {
    setSelectedPartner(partner);
    setDescription(partner.description);
    setImageFile(null);
    setResetKey((prev) => prev + 1);
    if (isMobile) setModalOpen(true);
  };

  const handleClear = () => {
    setSelectedPartner(null);
    setImageFile(null);
    setDescription("");
    setResetKey((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    const isEditing = Boolean(selectedPartner);
    if (!description.trim() || (!isEditing && !imageFile)) {
      showToast("Image and description are required", "info");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    const endpoint = isEditing
      ? `/api/partners/${selectedPartner?.id}`
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

      if (!response.ok) throw new Error("Submit failed");

      showToast(
        isEditing ? "Partner updated!" : "New partner added!",
        "success"
      );
      await fetchPartners();
      handleClear();
    } catch {
      showToast("Error submitting", "error");
    }
  };

  const handleSoftDelete = async () => {
    if (!selectedPartner) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/partners/${selectedPartner.id}/softDelete`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error();
      showToast("Partner archived", "success");
      handleClear();
      fetchPartners();
    } catch {
      showToast("Error archiving partner", "error");
    }
  };

  const partnerForm = (
    <PartnerForm
      imageFile={imageFile}
      setImageFile={setImageFile}
      description={description}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
      handleSoftDelete={handleSoftDelete}
      resetKey={resetKey}
      selectedPartner={selectedPartner}
    />
  );

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-[#326333] p-4 rounded gap-4 overflow-y-auto">
      {!isMobile && (
        <div className="flex flex-col w-full lg:w-1/3 h-96 lg:h-full">
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
            {partnerForm}
          </div>
        </div>
      )}

      {isMobile && (
        <PartnersModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          partner={selectedPartner}
          description={description}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
          handleClear={handleClear}
          handleSoftDelete={handleSoftDelete}
          resetSelectedCard={handleClear}
          form={partnerForm}
        />
      )}

      <div className="flex flex-col w-full lg:w-2/3 h-full overflow-y-auto">
        <h1 className="flex text-white items-center font-medium p-4">
          Select Partners to Edit
        </h1>
        {isMobile && (
          <button
            onClick={() => {
              handleClear();
              setModalOpen(true);
            }}
            className="mb-2 bg-white text-[#326333] font-semibold py-2 px-4 rounded shadow hover:bg-gray-100 transition"
          >
            + Add Partner
          </button>
        )}
        <div className="flex flex-col gap-2 w-full h-full overflow-y-auto bg-white/50 rounded p-4 break-words whitespace-pre-wrap">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col lg:flex-row gap-2 w-full h-56 rounded p-2 cursor-pointer"
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
    </div>
  );
}
