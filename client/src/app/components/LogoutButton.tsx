import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./provider/ToastContext";

export default function LogoutButton() {
  const router = useRouter();
  const { showToast } = useToast();

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });

      showToast("Logged out successfully!", "success");
      router.replace("/pages/admin-page");
    } catch (err) {
      console.error("Logout failed", err);
      showToast(
        "An error occurred while logging out. Please try again.",
        "error"
      );
    }
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="px-6 py-2 lg:py-3 bg-[#326333] text-white rounded-md lg:hover:bg-red-600 transition-colors duration-300 cursor-pointer absolute bottom-10 lg:right-10"
      >
        Logout
      </button>
    </div>
  );
}
