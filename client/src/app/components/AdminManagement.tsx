import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./provider/ToastContext";

import { FaUserCog } from "react-icons/fa";
import Loading from "./Loading";

type AdminType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export default function AdminManagement() {
  const router = useRouter();
  const { showToast } = useToast();

  const [admins, setAdmins] = useState<AdminType[]>([]);

  const [selectedAdmin, setSelectedAdmin] = useState<AdminType | null>(null);
  const [checkRole, setCheckRole] = useState<string | null>(null);

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
          showToast("You are not authenticated. Redirecting...", "error");
          router.replace("/pages/admin-page"); // Not authenticated
          return;
        }

        const data = await response.json();

        const userRole = data.user?.role;

        if (!["superAdmin", "adminManager"].includes(userRole)) {
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

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleAdminClick = (admin: AdminType) => {
    setSelectedAdmin(admin);
    setFormValues({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: admin.role,
    });
  };

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

  const handleSubmit = async () => {
    if (!selectedAdmin)
      return showToast("Please select an admin to update", "error");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admins/${selectedAdmin._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed");
      }

      showToast("Admin updated successfully!", "success");

      // Optional: Refresh admin list
      const updatedAdmins = admins.map((admin) =>
        admin._id === selectedAdmin._id ? { ...admin, ...formValues } : admin
      );
      setAdmins(updatedAdmins);
      setSelectedAdmin(null);
      setFormValues({ firstName: "", lastName: "", email: "", role: "" });
    } catch (error) {
      console.error(error);
      showToast("An error occurred while updating the admin.", "error");
    }
  };

  if (!isAuthenticated) return <Loading />;

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-[#326333] p-4 rounded gap-4">
      <div className="flex flex-col w-full h-[650px] lg:h-full gap-4 bg-white/50 p-4 rounded overflow-y-auto">
        <h1 className="flex gap-1 text-white items-center font-medium">
          <FaUserCog size={24} />
          Manage Admin
        </h1>
        <div className="flex flex-col gap-6 w-full">
          {["firstName", "lastName", "email", "role"].map((field) => {
            const isDisabled = field === "role" && checkRole !== "superAdmin";
            return (
              <input
                key={field}
                name={field}
                type="text"
                value={formValues[field as keyof typeof formValues]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                disabled={isDisabled}
                className={`text-black p-4 rounded-xl outline-none ${
                  isDisabled
                    ? "bg-neutral-400 cursor-not-allowed"
                    : "bg-white/90"
                }`}
              />
            );
          })}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-white/90 px-2 py-3 rounded-xl w-40 mt-2 lg:mt-4 text-neutral-700 cursor-pointer hover:scale-105 transition-all duration-300"
        >
          {selectedAdmin ? "Update Admin" : "Submit"}
        </button>
      </div>
      <div className="grid gap-4 w-full h-[650px] lg:h-full bg-white/50 rounded p-4 overflow-y-auto">
        <div className="grid w-full h-full gap-4">
          {admins.map((admin) => (
            <div
              key={admin._id}
              onClick={() => handleAdminClick(admin)}
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
