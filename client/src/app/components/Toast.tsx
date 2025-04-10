"use client";
import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div
      className={`flex items-center justify-center fixed w-80 h-16 bottom-8 right-8 z-2 bg-[#30632c] rounded-xl transition-all duration-500`}
    >
      <span className="text-white">{message}</span>
    </div>
  );
}
