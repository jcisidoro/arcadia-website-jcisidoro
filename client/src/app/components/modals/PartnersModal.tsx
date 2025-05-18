import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../ui/animated-modal";
import { PartnerForm } from "../PartnersForm";

type PartnerType = {
  id: string;
  imageUrl: string;
  description: string;
};

type PartnersModalProps = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  partner: PartnerType | null;
  description: string;
  setDescription: (val: string) => void;
  handleSubmit: () => void;
  handleClear: () => void;
  handleSoftDelete: () => void;
  resetSelectedCard: () => void;
};

export function PartnersModal({
  open,
  onOpenChange,
  partner,
  description,
  setDescription,
  handleSubmit,
  handleClear,
  handleSoftDelete,
  resetSelectedCard,
}: PartnersModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resetKey, setResetKey] = useState(0);

  // Update when partner changes
  useEffect(() => {
    if (partner) {
      setImageFile(null);
      setResetKey((prev) => prev + 1);
    }
  }, [partner]);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalBody resetSelectedCard={resetSelectedCard}>
        <ModalContent className="overflow-y-auto bg-[#326333]">
          <PartnerForm
            imageFile={imageFile}
            setImageFile={setImageFile}
            description={description}
            setDescription={setDescription}
            handleSubmit={handleSubmit}
            handleSoftDelete={handleSoftDelete}
            resetKey={resetKey}
            selectedPartner={partner}
          />
          <ModalFooter className="flex justify-center mt-4 bg-transparent">
            <button
              onClick={() => {
                handleClear();
                onOpenChange(false);
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded w-full"
            >
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
