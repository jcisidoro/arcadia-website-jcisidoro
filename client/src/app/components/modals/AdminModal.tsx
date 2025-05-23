// components/modals/AdminsModal.tsx
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../ui/animated-modal";

type AdminsModalProps = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClear: () => void;
  resetSelectedCard: () => void;
  form: React.ReactNode;
};

export function AdminsModal({
  open,
  onOpenChange,
  onClear,
  resetSelectedCard,
  form,
}: AdminsModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalBody resetSelectedCard={resetSelectedCard}>
        <ModalContent className="overflow-y-auto bg-[#326333] p-4 rounded">
          {form}
          <ModalFooter className="flex justify-center mt-4 bg-transparent">
            <button
              onClick={() => {
                onClear();
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
