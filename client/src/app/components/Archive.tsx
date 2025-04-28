import React from "react";
import { FaBoxArchive } from "react-icons/fa6";

export default function Archive() {
  return (
    <div className="flex flex-col w-full bg-[#326333] rounded p-4 gap-2">
      <h1 className="flex items-center gap-1 text-white font-medium p-4">
        <FaBoxArchive size={24} />
        Archive
      </h1>
      <div className="flex flex-col lg:flex-row w-full h-full gap-4">
        <div className="flex w-full bg-white/50 rounded h-96 lg:h-full p-4">
          <div className="flex w-full h-full bg-white rounded text-black p-2">
            Events
          </div>
        </div>
        <div className="flex w-full bg-white/50 rounded h-96 lg:h-full p-4">
          <div className="flex w-full h-full bg-white rounded text-black p-2">
            Admin Accounts
          </div>
        </div>
        <div className="flex w-full bg-white/50 rounded h-96 lg:h-full p-4">
          <div className="flex w-full h-full bg-white rounded text-black p-2">
            Company Partners
          </div>
        </div>
      </div>
    </div>
  );
}
