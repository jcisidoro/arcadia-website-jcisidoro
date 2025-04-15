import Image from "next/image";
import React from "react";
import { LuHeartHandshake } from "react-icons/lu";

export default function CompanyPartners() {
  return (
    <div className="flex flex-col w-full h-full bg-[#326333] p-4 gap-4 rounded">
      <h1 className="flex items-center gap-1 text-white font-medium">
        <LuHeartHandshake size={24} />
        Manage Company Partners
      </h1>
      <div className="flex gap-2 w-full bg-white/50 h-56 rounded p-4">
        <div className="w-1/3 h-full relative bg-white rounded overflow-hidden">
          <Image
            src="/fertilizer.avif"
            alt="Company Logo"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex w-2/3 h-full bg-white rounded">
          <textarea
            className="w-full p-4 resize-none"
            placeholder="Description"
          />
        </div>
      </div>
    </div>
  );
}
