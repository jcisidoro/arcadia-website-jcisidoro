import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./provider/ToastContext";

import { FaUserCog } from "react-icons/fa";

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

  const [, setIsAuthenticated] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  // Clear fields
  const handleClear = () => {
    setFormValues({ firstName: "", lastName: "", email: "", role: "" });
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

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-[#326333] p-4 rounded gap-4 overflow-y-auto">
      <div className="flex flex-col w-full h-auto md:h-[650px] lg:h-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="flex gap-1 text-white items-center font-medium p-4">
            <FaUserCog size={24} />
            Manage Admin
          </h1>
          <button
            onClick={handleClear}
            className="bg-white/50 w-16 h-8 rounded text-white text-sm cursor-pointer hover:scale-105 transition-all duration-300"
          >
            Clear
          </button>
        </div>
        <div className="flex flex-col w-full h-full gap-4 bg-white/50 p-4 rounded overflow-y-auto">
          <div className="flex flex-col gap-6 w-full">
            {["firstName", "lastName", "email"].map((field) => {
              const isEditingSuperAdmin = selectedAdmin?.role === "superAdmin";
              const shouldDisable =
                isEditingSuperAdmin && checkRole !== "superAdmin";

              return (
                <input
                  key={field}
                  name={field}
                  type="text"
                  value={formValues[field as keyof typeof formValues]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  disabled={shouldDisable}
                  className={`text-black p-4 rounded-xl outline-none ${
                    shouldDisable
                      ? "bg-neutral-400 cursor-not-allowed"
                      : "bg-white/90"
                  }`}
                />
              );
            })}

            <select
              name="role"
              value={formValues.role}
              onChange={handleChange}
              disabled={
                selectedAdmin?.role === "superAdmin" &&
                checkRole !== "superAdmin"
              }
              className={`text-black p-4 rounded-xl outline-none cursor-pointer ${
                selectedAdmin?.role === "superAdmin" &&
                checkRole !== "superAdmin"
                  ? "bg-neutral-400 cursor-not-allowed"
                  : "bg-white/90"
              }`}
            >
              {(checkRole === "superAdmin" ||
                formValues.role === "superAdmin") && (
                <option value="superAdmin">Super Admin</option>
              )}
              <option value="accCreator">Account Creator</option>
              <option value="eventHandler">Event Handler</option>
              <option value="adminManager">Admin Manager</option>
            </select>
          </div>
          <div className="flex gap-2 w-full">
            <button
              onClick={handleSubmit}
              className="bg-white/90 px-2 py-3 rounded-xl w-40 mt-2 lg:mt-4 text-neutral-700 cursor-pointer hover:scale-105 transition-all duration-300"
            >
              {selectedAdmin ? "Update Admin" : "Submit"}
            </button>
            <button
              disabled
              className="bg-red-500/90 px-2 py-3 rounded-xl w-40 mt-2 lg:mt-4 text-white cursor-pointer hover:scale-105 transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-[650px] lg:h-full">
        <h1 className="flex text-white items-center font-medium p-4">
          Select Admin Account to Edit
        </h1>
        <div className="flex flex-col w-full h-full gap-4 bg-white/50 p-4 rounded overflow-y-auto">
          <div className="flex flex-col gap-6 w-full">
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
    </div>
  );
}
