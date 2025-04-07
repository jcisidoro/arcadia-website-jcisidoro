"use client";
import { useRouter } from "next/navigation";
import { FaKey } from "react-icons/fa";

export default function AdminAuthKey() {
  const router = useRouter();

  const handleAdminClick = () => {
    const token = localStorage.getItem("token"); // Always check latest token
    if (token) {
      router.push("/components/admin-event-handler"); // Redirect to Admin Panel
    } else {
      router.push("/pages/admin-page"); // Redirect to Login Page
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-60">
      <button
        onClick={handleAdminClick}
        className="bg-[#326333] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110 transition-all border-1"
      >
        <FaKey className="text-white" />
      </button>
    </div>
  );
}
