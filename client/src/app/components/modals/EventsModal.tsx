import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../ui/animated-modal";

type EventModalProps = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  form: React.ReactNode;
  handleClear: () => void;
  resetSelectedCard: () => void;
};

export function EventModal({
  open,
  onOpenChange,
  form,
  handleClear,
  resetSelectedCard,
}: EventModalProps) {
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
