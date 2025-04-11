"use client";
import React, { useEffect, useState } from "react";
import BackgroundVideo from "../BackgroundVideo";
import Image from "next/image";

import { useRouter } from "next/navigation";
import LogoutButton from "../LogoutButton";

import { useToast } from "@/app/components/provider/ToastContext";
import Cookies from "js-cookie";

export default function AdminRegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [role, setRole] = useState("accCreator");
  const [, setCheckRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get("authToken");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/check-auth`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          showToast("You are not authenticated. Redirecting...", "error");
          router.replace("/pages/admin-page");
          return;
        }

        const data = await response.json();
        const userRole = data.user.role;

        if (!["superAdmin", "accCreator"].includes(userRole)) {
          showToast("You do not have admin access.", "error");
          router.replace("/pages/admin-page");
        } else {
          setIsAuthenticated(true);
          setCheckRole(userRole);
        }
      } catch (err) {
        console.error(err);
        showToast(
          "Error while verifying authentication. Please try again.",
          "error"
        );
        router.replace("/pages/admin-page");
      }
    };

    checkAuth();
  }, [router, showToast]);

  const handleAdminRegister = async () => {
    console.log(role);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          role,
        }),
        credentials: "include",
      }
    );

    const data = await res.json();

    if (res.ok) {
      showToast("Admin account created successfully!", "success");
      router.push("/components/admin-register-page");
      // reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("accCreator");
    } else {
      showToast(data.message || "Something went wrong.", "error");
    }
  };

  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="flex w-full h-[1350px] sm:h-[1200px] lg:h-[900px] bg-[#326333]/50 px-10 pb-10 pt-24 relative justify-center">
      <div className="w-full h-[1100px] sm:h-[950px] md:h-[900px] lg:h-[650px] xl:h-[680px] flex justify-center">
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
                  value: firstName,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value),
                },
                {
                  type: "text",
                  placeholder: "Dela Cruz",
                  labelText: "Last Name",
                  value: lastName,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setLastName(e.target.value),
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <label className="text-white text-sm">{item.labelText}</label>
                  <input
                    type={item.type}
                    value={item.value}
                    onChange={item.onChange}
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
                  value: email,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value),
                },
                {
                  type: "password",
                  placeholder: "securepassword123",
                  labelText: "Password",
                  value: password,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value),
                },
                {
                  type: "password",
                  placeholder: "securepassword123",
                  labelText: "Confirm Password",
                  value: confirmPassword,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value),
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <label className="text-white text-sm">{item.labelText}</label>
                  <input
                    type={item.type}
                    value={item.value}
                    onChange={item.onChange}
                    className="bg-white rounded-lg outline-none p-3 w-full text-[#326333]"
                    placeholder={item.placeholder}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <label className="text-white text-sm">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-white rounded-lg outline-none p-3 w-full text-[#326333]"
                >
                  <option value="accCreator">accCreator</option>
                  <option value="eventHandler">eventHandler</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleAdminRegister}
              className="bg-white hover:bg-white/80 p-3 rounded-lg text-[#326333] mt-4 cursor-pointer transition-colors duration-300 w-32 block lg:absolute bottom-6 right-6"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* LOGOUT BUTTON */}
      <LogoutButton />
    </div>
  );
}
