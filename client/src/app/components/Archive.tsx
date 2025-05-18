import React, { useEffect, useState } from "react";
import { FaBoxArchive } from "react-icons/fa6";
import { useToast } from "./provider/ToastContext";

type Partner = {
  id: string;
  imageUrl: string;
  description: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
};

export default function Archive() {
  const { showToast } = useToast();
  const [archivedPartners, setArchivedPartners] = useState<Partner[]>([]);

  const fetchArchivedPartners = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/partners`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      const archived = data.filter((p: Partner) => p.isDeleted);
      setArchivedPartners(archived);
    } catch (error) {
      console.error("Failed to fetch archive:", error);
    }
  };

  useEffect(() => {
    fetchArchivedPartners();
  }, []);

  const handleHardDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/partners/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Delete failed");
      showToast("Partner permanently deleted", "success");
      fetchArchivedPartners();
    } catch (err) {
      console.error("Hard delete failed", err);
      showToast("Error deleting partner", "error");
    }
  };

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
        <div className="flex w-full bg-white/50 rounded h-96 lg:h-full p-4">
          <div className="flex flex-col w-full bg-[#326333] rounded h-56 p-2 text-black gap-2">
            <div className="flex w-full h-full bg-white p-2 rounded">
              Events
            </div>
            <div className="flex w-full justify-end gap-2">
              <button className="py-1 px-2 w-20 rounded text-white/80 bg-red-500/80 cursor-pointer hover:scale-105 hover:bg-red-500/80 transition-all duration-300 text-base">
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full bg-white/50 rounded h-96 lg:h-full p-4">
          {archivedPartners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col w-full bg-[#326333] rounded h-56 p-2 text-black gap-2"
            >
              <div className="flex w-full h-full bg-white p-2 rounded">
                {partner.description}
              </div>
              <div className="flex w-full justify-end gap-2">
                <button
                  onClick={() => handleHardDelete(partner.id)}
                  className="py-1 px-2 w-20 rounded text-white/80 bg-red-500/80 cursor-pointer hover:scale-105 hover:bg-red-500/80 transition-all duration-300 text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full bg-white/50 rounded h-96 lg:h-full p-4">
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
