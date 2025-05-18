// components/PartnerForm.tsx
import React from "react";
import { FileUploadDemo } from "./FileUpload";

type PartnerType = {
  id: string;
  imageUrl: string;
  description: string;
};

type PartnerFormProps = {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  description: string;
  setDescription: (desc: string) => void;
  handleSubmit: () => void;
  handleSoftDelete: () => void;
  resetKey: number;
  selectedPartner: PartnerType | null;
};

export const PartnerForm = ({
  setImageFile,
  description,
  setDescription,
  handleSubmit,
  handleSoftDelete,
  resetKey,
  selectedPartner,
}: PartnerFormProps) => {
  return (
    <div className="flex flex-col w-full h-full gap-4 bg-white/50 p-4 rounded overflow-y-auto">
      <FileUploadDemo
        onChange={(file: File) => setImageFile(file)}
        resetKey={resetKey}
        key={resetKey}
        existingImageUrl={selectedPartner?.imageUrl || null}
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
        disabled={!selectedPartner}
        className="px-4 py-2 bg-red-500/90 hover:bg-red-500/70 rounded text-neutral-100 cursor-pointer hover:scale-105 transition-all duration-300"
      >
        Delete
      </button>
    </div>
  );
};
