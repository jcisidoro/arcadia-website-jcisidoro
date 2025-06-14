import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBoxArchive } from "react-icons/fa6";
//import { useToast } from "./provider/ToastContext";

type Partner = {
  id: string;
  imageUrl: string;
  description: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
};

type Event = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  fromDate: string;
  toDate: string;
  isDeleted?: boolean;
};

export default function Archive() {
  //const { showToast } = useToast();
  const [softDeletedPartners, setSoftDeletedPartners] = useState<Partner[]>([]);
  const [softDeletedEvents, setSoftDeletedEvents] = useState<Event[]>([]);

  const fetchSoftDeletedPartners = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/partners/softDeletedPartners`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching soft deleted partners:", errorText);
        return;
      }

      const data = await response.json();
      setSoftDeletedPartners(data);
    } catch (error) {
      console.error("Failed to fetch archive partners:", error);
    }
  };

  const fetchSoftDeletedEvents = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/softDeleted-events`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching soft deleted events:", errorText);
        return;
      }

      const data = await response.json();
      setSoftDeletedEvents(data);
    } catch (error) {
      console.error("Failed to fetch archive soft-deleted events:", error);
    }
  };

  useEffect(() => {
    fetchSoftDeletedPartners();
    fetchSoftDeletedEvents();
  }, []);

  // const handleHardDelete = async (id: string) => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/partners/${id}`,
  //       {
  //         method: "DELETE",
  //         credentials: "include",
  //       }
  //     );

  //     if (!response.ok) throw new Error("Delete failed");
  //     showToast("Partner permanently deleted", "success");
  //     fetchSoftDeletedPartners();
  //   } catch (err) {
  //     console.error("Hard delete failed", err);
  //     showToast("Error deleting partner", "error");
  //   }
  // };

  return (
    <div className="flex flex-col w-full bg-[#326333] rounded p-4 gap-2 overflow-y-auto">
      <div className="flex w-full justify-between items-center">
        <h1 className="flex items-center gap-1 text-white font-medium p-4">
          <FaBoxArchive size={24} />
          Archive
        </h1>

        <p className="text-white text-xs lg:text-sm">
          All content in this archive will be automatically deleted after 2
          years.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 w-full h-full gap-4 overflow-y-auto">
        {/* EVENTS */}
        <div className="flex flex-col w-full bg-white/50 rounded h-96 p-4 overflow-y-auto gap-4">
          {softDeletedEvents.length === 0 ? (
            <p className="flex h-full items-center justify-center text-black">
              No archived events.
            </p>
          ) : (
            softDeletedEvents.map((event, index) => (
              <div
                key={event.id || `event-${index}`}
                className="flex flex-col w-full bg-[#326333] rounded h-56 p-2 text-black gap-2"
              >
                <div className="flex w-full h-full bg-white p-2 rounded gap-4">
                  <div className="flex w-full lg:w-56 h-full relative">
                    <Image
                      unoptimized
                      src={event.imageUrl}
                      alt="Company Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="hidden lg:flex flex-col h-full gap-2">
                    <h3 className="font-semibold font-cormorant text-[#326333] text-3xl">
                      {event.title}
                    </h3>
                    <p className="w-full">
                      {new Date(event.fromDate).toLocaleDateString()} -{" "}
                      {new Date(event.toDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex w-full justify-end gap-2">
                  <button
                    //onClick={() => handleHardDelete(event.id)}
                    disabled
                    className="py-1 px-2 w-20 rounded text-white/80 bg-red-500/80 cursor-pointer hover:scale-105 hover:bg-red-500/80 transition-all duration-300 text-base"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PARTNERS */}
        <div className="flex flex-col w-full bg-white/50 rounded h-96 p-4 gap-4 overflow-y-auto">
          {softDeletedPartners.length === 0 ? (
            <p className="flex h-full items-center justify-center text-black">
              No archived partners.
            </p>
          ) : (
            softDeletedPartners.map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col w-full bg-[#326333] rounded h-56 p-2 text-black gap-2"
              >
                <div className="flex w-full h-full bg-white p-2 gap-4 rounded">
                  <div className="flex w-full lg:w-56 h-full relative">
                    <Image
                      unoptimized
                      src={partner.imageUrl}
                      alt="Company Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="hidden lg:flex h-full">
                    {partner.description}
                  </div>
                </div>
                <div className="flex w-full justify-end gap-2">
                  <button
                    //onClick={() => handleHardDelete(partner.id)}
                    className="py-1 px-2 w-20 rounded text-white/80 bg-red-500/80 cursor-pointer hover:scale-105 hover:bg-red-500/80 transition-all duration-300 text-base"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PUBLICATIONS */}
        <div className="flex w-full bg-white/50 rounded h-96 p-4 gap-4 overflow-y-auto">
          <div className="flex flex-col w-full bg-[#326333] rounded h-56 p-2 text-black gap-2">
            <div className="flex w-full h-full bg-white p-2 rounded">
              Publications
            </div>
            <div className="flex w-full justify-end gap-2">
              <button className="py-1 px-2 w-20 rounded text-white/80 bg-red-500/80 cursor-pointer hover:scale-105 hover:bg-red-500/80 transition-all duration-300 text-base">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
