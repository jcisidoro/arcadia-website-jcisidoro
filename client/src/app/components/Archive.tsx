import React from "react";
import { FaBoxArchive } from "react-icons/fa6";

export default function Archive() {
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
      <div className="flex flex-col lg:flex-row w-full h-full gap-4 overflow-y-auto">
        <div className="flex w-full bg-white/50 rounded h-96 lg:h-full p-4">
          <div className="flex flex-col w-full bg-[#326333] rounded h-56 p-2 text-black gap-2">
            <div className="flex w-full h-full bg-white p-2 rounded">
              Events
            </div>
            <div className="flex w-full justify-end gap-2">
              <button className="py-1 px-2 w-20 rounded text-white bg-red-500">
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full bg-white/50 rounded h-96 lg:h-full p-4">
          <div className="flex flex-col w-full bg-[#326333] rounded h-56 p-2 text-black gap-2">
            <div className="flex w-full h-full bg-white p-2 rounded">
              Company Partners
            </div>
            <div className="flex w-full justify-end gap-2">
              <button className="py-1 px-2 w-20 rounded text-white bg-red-500">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
