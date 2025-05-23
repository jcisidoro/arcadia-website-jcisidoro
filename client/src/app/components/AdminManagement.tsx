import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./provider/ToastContext";
import { useIsMobile } from "./hooks/useIsMobile";
import { AdminForm } from "./forms/AdminsForm";
import { AdminsModal } from "./modals/AdminModal";

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
  const isMobile = useIsMobile();

  const [admins, setAdmins] = useState<AdminType[]>([]);

  const [selectedAdmin, setSelectedAdmin] = useState<AdminType | null>(null);
  const [checkRole, setCheckRole] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [, setIsAuthenticated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
        const userId = data.user?.id;

        if (!["superAdmin", "adminManager"].includes(userRole)) {
          showToast("You do not have admin access.", "error");
          router.replace("/pages/admin-page");
          return;
        }

        setCurrentUserId(userId);
        setCheckRole(userRole);
        setIsAuthenticated(true);
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
    if (checkRole !== "superAdmin" && admin.role === "superAdmin") {
      showToast("You are not allowed to manage a superAdmin.", "error");
      return;
    }

    setSelectedAdmin(admin);
    setFormValues({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: admin.role,
    });

    if (isMobile) setModalOpen(true);
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin`,
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

  // Clear fields
  const handleClear = () => {
    setSelectedAdmin(null);
    setFormValues({ firstName: "", lastName: "", email: "", role: "" });
  };

  const handleSubmit = async () => {
    if (!selectedAdmin)
      return showToast("Please select an admin to update", "error");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/${selectedAdmin._id}`,
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

      // Update UI
      const updatedAdmins = admins.map((admin) =>
        admin._id === selectedAdmin._id ? { ...admin, ...formValues } : admin
      );
      setAdmins(updatedAdmins);
      handleClear();
    } catch (error) {
      console.error(error);
      showToast("An error occurred while updating the admin.", "error");
    }
  };

  const handleDelete = async () => {
    if (!selectedAdmin) return;

    // Only superAdmin can delete admins
    if (checkRole !== "superAdmin") {
      return showToast("Only a superAdmin can delete admins", "error");
    }

    // Prevent self-deletion
    if (selectedAdmin._id === currentUserId) {
      return showToast("You cannot delete your own account", "error");
    }

    // Prevent deleting the last remaining superAdmin
    if (selectedAdmin.role === "superAdmin") {
      const superAdminCount = admins.filter(
        (admin) => admin.role === "superAdmin"
      ).length;
      if (superAdminCount <= 1) {
        return showToast(
          "You cannot delete the last remaining superAdmin",
          "error"
        );
      }
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedAdmin.firstName} ${selectedAdmin.lastName}?`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/deleteAdmin/${selectedAdmin._id}`,
        { method: "DELETE", credentials: "include" }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Delete failed");
      }

      showToast("Admin deleted successfully!", "success");
      setAdmins(admins.filter((a) => a._id !== selectedAdmin._id));
      handleClear();
    } catch (err) {
      console.error(err);
      showToast("Error deleting admin", "error");
    }
  };

  const canDelete = () => {
    if (!selectedAdmin) return false;

    // Only superAdmin can delete
    if (checkRole !== "superAdmin") return false;

    // Prevent self-deletion
    if (selectedAdmin._id === currentUserId) return false;

    // Prevent deleting the last remaining superAdmin
    if (
      selectedAdmin.role === "superAdmin" &&
      admins.filter((admin) => admin.role === "superAdmin").length <= 1
    ) {
      return false;
    }

    return true;
  };

  const canSubmit = () => {
    if (!selectedAdmin) return false;

    if (selectedAdmin._id === currentUserId) return false;

    return true;
  };

  const adminForm = (
    <AdminForm
      formValues={formValues}
      onChange={handleChange}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      canSubmit={canSubmit()}
      canDelete={canDelete()}
      isDisabled={
        selectedAdmin?.role === "superAdmin" && checkRole !== "superAdmin"
      }
    />
  );

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-[#326333] p-4 rounded gap-4 overflow-y-auto">
      <div className="flex flex-col w-full h-auto md:h-[650px] lg:h-full">
        {!isMobile && (
          <div className="flex flex-col w-full h-auto md:h-[650px] lg:h-full">
            {/* Desktop form */}
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
            {adminForm}
          </div>
        )}
      </div>

      {isMobile && (
        <AdminsModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          onClear={handleClear}
          // handleSoftDelete={handleSoftDelete}
          resetSelectedCard={handleClear}
          form={adminForm}
        />
      )}

      <div className="flex flex-col w-full h-[650px] lg:h-full">
        <h1 className="flex text-white items-center font-medium p-4">
          Select Admin Account to Edit
        </h1>
        <div className="flex flex-col w-full h-full gap-4 bg-white/50 p-4 rounded overflow-y-auto">
          <div className="flex flex-col gap-6 w-full">
            {admins
              .filter(
                (admin) =>
                  checkRole === "superAdmin" || admin.role !== "superAdmin"
              )
              .map((admin) => (
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
