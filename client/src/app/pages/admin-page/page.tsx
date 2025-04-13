"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/provider/ToastContext";

export default function AdminAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // const csrfRes = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/csrf-token`,
      //   { credentials: "include" }
      // );
      // const { csrfToken } = await csrfRes.json();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "CSRF-Token": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      showToast("Login successful!", "success");
      router.push("/components/admin-page-handler");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        showToast(err.message, "error");
      } else {
        setError("An unknown error occurred.");
        showToast("An unknown error occurred.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-[#326333]/50 px-4">
      <div className="bg-[#326333] w-full sm:w-[600px] h-auto rounded-xl p-10 shadow-lg">
        <h1 className="font-bold text-3xl lg:text-4xl text-white text-center mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-md text-lg border-none outline-none bg-white text-[#326333]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="p-3 rounded-md text-lg border-none outline-none bg-white text-[#326333]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-4 bg-white text-[#326333] font-bold py-3 rounded-md hover:bg-gray-200 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
