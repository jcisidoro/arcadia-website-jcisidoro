"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "../LogoutButton";

export default function AdminPageHandler() {
  const router = useRouter();
  const [checkRole, setCheckRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/check-auth`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          router.replace("/pages/admin-page"); // Not authenticated
          return;
        }

        const data = await response.json();
        const userRole = data.user.role;

        if (!["superAdmin", "accCreator", "eventHandler"].includes(userRole)) {
          router.replace("/pages/admin-page");
        } else {
          setIsAuthenticated(true);
          setCheckRole(userRole);
        }
      } catch (err) {
        router.replace("/pages/admin-page");
      }
    };

    checkAuth();
  }, [router]);

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
              disabled={
                checkRole !== "superAdmin" && checkRole !== "eventHandler"
              }
              className={`bg-[#326333] text-white rounded-2xl py-4 px-3 text-lg sm:text-4xl lg:text-5xl 2xl:text-7xl w-full md:w-[500px] lg:w-[700px] 2xl:w-[900px] uppercase font-cormorant font-semibold  transition-all duration-300 ${
                checkRole !== "superAdmin" && checkRole !== "eventHandler"
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 cursor-pointer"
              }`}
            >
              Add Event
            </button>
          </Link>

          <Link href="/components/admin-register-page">
            <button
              disabled={
                checkRole !== "superAdmin" && checkRole !== "accCreator"
              }
              className={`bg-[#326333] text-white rounded-2xl py-4 px-3 text-lg sm:text-4xl lg:text-5xl 2xl:text-6xl w-full md:w-[500px] lg:w-[700px] 2xl:w-[900px] uppercase font-cormorant font-semibold transition-all duration-300 ${
                checkRole !== "superAdmin" && checkRole !== "accCreator"
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
      <LogoutButton />
    </div>
  );
}
