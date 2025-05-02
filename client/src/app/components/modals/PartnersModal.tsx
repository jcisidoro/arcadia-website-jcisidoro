"use client";
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
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalBody resetSelectedCard={resetSelectedCard}>
        <ModalContent>
          <h2 className="text-xl font-bold mb-4 text-center">
            {partner ? "Edit Partner" : "Add New Partner"}
          </h2>

          {partner && (
            <div className="mb-4">
              <img
                src={partner.imageUrl}
                alt="Partner Image"
                className="w-40 h-40 object-cover rounded mx-auto"
              />
            </div>
          )}

          <textarea
            className="w-full border p-2 rounded mb-4"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <ModalFooter className="flex justify-between gap-2">
            {partner && (
              <button
                onClick={handleSoftDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Archive
              </button>
            )}
            <button
              onClick={handleClear}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {partner ? "Update" : "Add"}
            </button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
