// /pages/ContactUs.tsx
"use client";
import React, { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMsg("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/email/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const text = await res.text(); // Read raw response as text first
      console.log("Response text:", text);

      if (!text) {
        setResponseMsg("Server sent an empty response.");
        return;
      }

      let data;
      try {
        data = JSON.parse(text); // Safely parse
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        setResponseMsg("Server sent an invalid response.");
        return;
      }

      if (res.ok) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          contact: "",
          notes: "",
        });
        setResponseMsg(data.message || "Message sent!");
      }
    } catch (err) {
      console.error("Failed to send:", err);
      setResponseMsg("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-4 lg:p-10 gap-4 flex flex-col bg-white mt-0.5">
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-4xl font-bold text-black">
          Contact Us
        </h1>
        <span className="text-sm md:text-base text-justify text-black font-medium">
          Send us a message, and we'll get back to you as soon as we can.
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:grid grid-cols-2 gap-4 items-center">
          {[
            { name: "firstName", placeholder: "First Name", type: "text" },
            { name: "lastName", placeholder: "Last Name", type: "text" },
            { name: "email", placeholder: "Email Address", type: "email" },
            { name: "contact", placeholder: "Contact Number", type: "text" },
            { name: "notes", placeholder: "Notes", type: "textarea" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-2 w-full">
              <label className="text-black text-sm lg:text-base font-medium">
                {item.placeholder}
              </label>
              {item.type === "textarea" ? (
                <textarea
                  value={formData.notes}
                  name={item.name}
                  onChange={handleChange}
                  className="flex w-full p-4 bg-[#326333]/90 text-white placeholder:text-white/60 rounded-xl h-32 resize-none"
                  placeholder={item.placeholder}
                  required
                />
              ) : (
                <input
                  type={item.type}
                  name={item.name}
                  value={formData[item.name as keyof typeof formData]}
                  onChange={handleChange}
                  className="flex w-full p-4 bg-[#326333]/90 text-white placeholder:text-white/60 rounded-xl"
                  placeholder={item.placeholder}
                  required
                />
              )}
            </div>
          ))}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="py-4 px-6 bg-[#326333]/90 rounded-xl text-white font-semibold lg:hover:scale-105 transition-all duration-300 mt-4 cursor-pointer hover:bg-[#326333]/80"
            >
              {isLoading ? "Sending..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
      {/* RESPONSE MESSAGE AFTER SUBMITTING */}
      {responseMsg && (
        <div className="col-span-2 text-center text-black font-medium">
          {responseMsg}
        </div>
      )}
    </div>
  );
}
