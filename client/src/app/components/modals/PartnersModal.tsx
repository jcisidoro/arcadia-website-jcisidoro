import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../ui/animated-modal";

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
  form: React.ReactNode;
};

export function PartnersModal({
  open,
  onOpenChange,
  handleClear,
  resetSelectedCard,
  form,
}: PartnersModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalBody resetSelectedCard={resetSelectedCard}>
        <ModalContent className="overflow-y-auto bg-[#326333]">
          {form}
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
