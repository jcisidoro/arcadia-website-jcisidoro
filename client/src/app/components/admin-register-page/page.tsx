"use client";
import React, { useEffect, useState } from "react";
import BackgroundVideo from "../BackgroundVideo";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [, setRole] = useState(null);
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
    <div className="flex w-full h-[1300px] sm:h-[1050px] lg:h-[850px] 2xl:h-[800px] bg-[#326333]/50 px-10 pb-10 pt-24 relative justify-center">
      <div className="w-full h-[1050px] sm:h-[850px] md:h-[800px] lg:h-[600px] flex justify-center">
        {/* CONTAINER */}
        <div className="flex flex-col lg:flex-row w-[650px] lg:w-[900px] h-full bg-[#326333]/90 rounded-2xl">
          <div className="flex w-full lg:w-1/3 h-full relative rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none">
            <BackgroundVideo
              width="w-[100vw]"
              height="h-full"
              className="rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none"
            />
            <div className="flex w-full h-full z-2 p-4">
              <div className="flex flex-col w-full h-full items-center justify-center">
                <div className="w-40 h-40 relative">
                  <Image
                    src="/arcadiaLogo1.png"
                    alt="Arcadia Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 items-center mb-5 lg:mx-4 xl:mx-0">
                  <h1 className="text-white uppercase text-3xl xl:text-5xl tracking-[0.5rem] font-cormorant font-semibold">
                    Arcadia
                  </h1>
                  <div className="w-full h-0.5 bg-white"></div>
                  <p className="text-white text-base xl:text-lg uppercase font-semibold tracking-[0.3rem] text-center">
                    Sustainability Hub
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-2/3 h-full p-4 rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl gap-4 relative">
            <h1 className="text-white font-cormorant text-5xl xl:text-6xl uppercase font-bold">
              Create Admin Account
            </h1>

            <div className="grid sm:grid-cols-2 w-full gap-4">
              {[
                {
                  type: "text",
                  placeholder: "Juan",
                  labelText: "First Name",
                },
                {
                  type: "text",
                  placeholder: "Dela Cruz",
                  labelText: "Last Name",
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <label className="text-white text-sm">{item.labelText}</label>
                  <input
                    type={item.type}
                    className="bg-white rounded-lg outline-none p-3 w-full text-[#326333]"
                    placeholder={item.placeholder}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full h-full gap-4">
              {[
                {
                  type: "email",
                  placeholder: "admin@example.com",
                  labelText: "Email",
                },
                {
                  type: "password",
                  placeholder: "securepassword123",
                  labelText: "Password",
                },
                {
                  type: "password",
                  placeholder: "securepassword123",
                  labelText: "Confirm Password",
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <label className="text-white text-sm">{item.labelText}</label>
                  <input
                    type={item.type}
                    className="bg-white rounded-lg outline-none p-3 w-full text-[#326333]"
                    placeholder={item.placeholder}
                  />
                </div>
              ))}
            </div>
            <button className="bg-white hover:bg-white/80 p-3 rounded-lg text-[#326333] mt-4 cursor-pointer transition-colors duration-300 w-32 block lg:absolute bottom-6 right-6">
              Submit
            </button>
          </div>
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
