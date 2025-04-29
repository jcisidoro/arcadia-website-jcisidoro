import React from "react";
import { IoBookSharp } from "react-icons/io5";

export default function Publications() {
  return (
    <div className="flex flex-col h-full w-full bg-[#326333] rounded">
      <h1 className="flex items-center gap-1 text-white font-medium p-4">
        <IoBookSharp size={24} />
        Publications
      </h1>
      <div className="flex w-full h-full"></div>
    </div>
  );
}
