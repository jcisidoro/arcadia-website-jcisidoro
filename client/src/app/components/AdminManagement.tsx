import React, { useEffect, useState } from "react";
import { FaUserCog } from "react-icons/fa";

type AdminType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export default function AdminManagement() {
  const [admins, setAdmins] = useState<AdminType[]>([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admins`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-[#326333] p-4 rounded gap-4">
      <div className="flex flex-col w-full h-[650px] lg:h-full gap-4 bg-white/50 p-4 rounded overflow-y-auto">
        <h1 className="flex gap-1 text-white items-center font-medium">
          <FaUserCog size={24} />
          Manage Admin
        </h1>
        <div className="flex flex-col gap-6 w-full">
          {["First Name", "Last Name", "Email", "Role"].map(
            (placeholder, index) => (
              <input
                key={index}
                type="text"
                className="text-black bg-white/90 p-4 rounded-xl outline-none"
                placeholder={placeholder}
              />
            )
          )}
        </div>
        <button className="bg-white/90 px-2 py-3 rounded-xl w-40 mt-2 lg:mt-4 text-neutral-700 cursor-pointer hover:scale-105 transition-all duration-300">
          Submit
        </button>
      </div>
      <div className="grid gap-4 w-full h-[650px] lg:h-full bg-white/50 rounded p-4 overflow-y-auto">
        <div className="grid w-full h-full gap-4">
          {admins.map((admin, index) => (
            <div
              key={index}
              className="flex flex-col w-full h-44 bg-white/90 rounded p-4 gap-4 hover:bg-[#326333]/50 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-black group-hover:text-white text-sm lg:text-base">
                First Name: {admin.firstName}
              </span>
              <span className="text-black group-hover:text-white text-sm lg:text-base">
                Last Name: {admin.lastName}
              </span>
              <span className="text-black group-hover:text-white text-sm lg:text-base">
                Email: {admin.email}
              </span>
              <span className="text-black group-hover:text-white text-sm lg:text-base">
                Role: {admin.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
