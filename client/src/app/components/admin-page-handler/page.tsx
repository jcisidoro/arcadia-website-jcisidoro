"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPageHandler() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/pages/admin-page"); // Redirect to login if no token
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setRole(decodedToken.role);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    router.push("/pages/admin-page"); // Redirect to login page
  };

  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="flex w-full h-[100vh] bg-[#326333]/50 px-10 pb-10 py-24 relative justify-center">
      <div className="flex flex-col items-center w-full h-full">
        <h1 className="text-white text-3xl sm:text-5xl lg:text-7xl 2xl:text-9xl font-cormorant uppercase font-semibold text-center">
          Event & Admin Management
        </h1>

        <div className="flex flex-col gap-4 md:items-center justify-center w-full h-full">
          <Link href="/components/admin-event-handler">
            <button
              disabled={role !== "superAdmin" && role !== "eventHandler"}
              className={`bg-[#326333] text-white rounded-2xl py-4 px-3 text-lg sm:text-4xl lg:text-5xl 2xl:text-7xl w-full md:w-[500px] lg:w-[700px] 2xl:w-[900px] uppercase font-cormorant font-semibold  transition-all duration-300 ${
                role !== "superAdmin" && role !== "eventHandler"
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 cursor-pointer"
              }`}
            >
              Add Event
            </button>
          </Link>

          <Link href="/components/admin-register-page">
            <button
              disabled={role !== "superAdmin" && role !== "accCreator"}
              className={`bg-[#326333] text-white rounded-2xl py-4 px-3 text-lg sm:text-4xl lg:text-5xl 2xl:text-6xl w-full md:w-[500px] lg:w-[700px] 2xl:w-[900px] uppercase font-cormorant font-semibold transition-all duration-300 ${
                role !== "superAdmin" && role !== "accCreator"
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 cursor-pointer"
              }`}
            >
              Create Admin Account
            </button>
          </Link>
        </div>
      </div>
      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="px-6 py-2 lg:py-3 bg-[#326333] text-white rounded-md lg:hover:bg-red-600 transition-colors duration-300 cursor-pointer absolute bottom-10 lg:right-10"
      >
        Logout
      </button>
    </div>
  );
}
