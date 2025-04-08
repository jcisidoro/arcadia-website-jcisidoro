"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileUploadDemo } from "../FileUpload";
import Image from "next/image";
import BackgroundVideo from "../BackgroundVideo";
// import Link from "next/link";

// import { IoIosArrowBack } from "react-icons/io";

export default function AdminEventHandler() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");
  const [speakers, setSpeakers] = useState("");
  const [attendees, setAttendees] = useState("");
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/pages/admin-page"); // Redirect to login if no token
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    router.push("/pages/admin-page"); // Redirect to login page
  };

  const handleAddEvent = async () => {
    if (
      !imageFile ||
      !title.trim() ||
      !speakers.trim() ||
      !attendees.trim() ||
      !fromDate ||
      !toDate ||
      !description.trim() ||
      !eventLink
    ) {
      alert("Please input necessary fields.");
      return;
    }

    setLoading(true);

    try {
      // Prepare form data for image upload and event details
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("title", title);
      formData.append("speakers", speakers);
      formData.append("attendees", attendees);
      formData.append("fromDate", fromDate);
      formData.append("toDate", toDate);
      formData.append("description", description);
      formData.append("description1", description1);
      formData.append("eventLink", eventLink);

      // Send all data to backend in one request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        router.push("/pages/events#upcoming-events");

        // Clear fields after submission
        setImageFile(null);
        setImageUrl(null);
        setFromDate("");
        setToDate("");
        setTitle("");
        setSpeakers("");
        setAttendees("");
        setDescription("");
        setDescription1("");
        setEventLink("");
        setResetKey((prev) => prev + 1);
      } else {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add event");
    }

    setLoading(false);
  };

  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="relative w-full h-[1700px] lg:h-[1000px] flex flex-col items-center justify-center bg-[#326333]/50">
      <div className="flex flex-col w-full h-[900px] lg:h-[700px] sm:w-[450px] md:w-[750px] lg:w-[800px] xl:w-[1050px] p-4 items-center justify-center relative">
        {/* <Link href="/components/admin-page-handler">
          <button className="rounded-full w-10 h-10 text-white bg-[#326333] flex justify-center items-center text-3xl cursor-pointer hover:scale-105 transition-all duration-300 absolute top-0 left-0">
            <IoIosArrowBack />
          </button>
        </Link> */}
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
          Add Event
        </h2>
        <div className="flex flex-col lg:flex-row w-full h-[1500px] items-center bg-[#326333]/90 rounded-2xl">
          <div className="bg-black/50 w-full lg:w-1/3 h-full flex flex-col items-center justify-center relative rounded-t-2xl lg:rounded-l-2xl">
            <BackgroundVideo
              width="w-[100vw]"
              height="h-full"
              className="rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none"
            />
            <div className="w-40 h-40 relative z-2">
              <Image
                src="/arcadiaLogo1.png"
                alt="Arcadia Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 items-center mb-5 z-1 lg:mx-4 xl:mx-0">
              <h1 className="text-white uppercase text-3xl xl:text-5xl tracking-[0.5rem] font-cormorant font-semibold">
                Arcadia
              </h1>
              <div className="w-full h-0.5 bg-white"></div>
              <p className="text-white text-base xl:text-lg uppercase font-semibold tracking-[0.3rem] text-center">
                Sustainability Hub
              </p>
            </div>
          </div>
          <div className="w-full lg:w-2/3 h-full p-4">
            <div className="flex flex-col lg:flex-row w-full h-full gap-2">
              <div className="flex flex-col w-full h-full">
                {[
                  {
                    placeholder: "Title",
                    value: title,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setTitle(e.target.value),
                  },
                  {
                    placeholder: "Speakers",
                    value: speakers,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setSpeakers(e.target.value),
                  },
                  {
                    placeholder: "Attendees",
                    value: attendees,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setAttendees(e.target.value),
                  },
                ].map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={item.placeholder}
                    value={item.value}
                    onChange={item.onChange}
                    className="bg-white/80 p-4 outline-none w-full rounded-xl mb-2 text-black"
                  />
                ))}
                <FileUploadDemo
                  onChange={(file: File) => setImageFile(file)}
                  resetKey={resetKey}
                />
              </div>
              <div className="w-full h-full flex flex-col">
                {[
                  {
                    labelText: "From Date",
                    value: fromDate,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setFromDate(e.target.value),
                    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
                      e.preventDefault(),
                  },
                  {
                    labelText: "To Date",
                    value: toDate,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setToDate(e.target.value),
                    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
                      e.preventDefault(),
                  },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col relative">
                    <label className="text-black text-xs absolute left-2 top-0.5">
                      {item.labelText}
                    </label>
                    <input
                      type="date"
                      value={item.value}
                      onChange={item.onChange}
                      className="bg-white/80 p-4 outline-none w-full rounded-xl mb-2 text-black"
                      onKeyDown={item.onKeyDown}
                    />
                  </div>
                ))}
                {[
                  {
                    placeholder: "Description",
                    value: description,
                    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setDescription(e.target.value),
                  },
                  {
                    placeholder: "Another Description",
                    value: description1,
                    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setDescription1(e.target.value),
                  },
                ].map((item, index) => (
                  <textarea
                    key={index}
                    placeholder={item.placeholder}
                    value={item.value}
                    onChange={item.onChange}
                    className="bg-white/80 p-4 outline-none w-full rounded-xl mb-2 h-32 resize-none text-black"
                  />
                ))}
                <input
                  type="text"
                  value={eventLink}
                  onChange={(e) => setEventLink(e.target.value)}
                  placeholder="Add event link"
                  className="bg-white/80 p-4 outline-none w-full rounded-xl mb-2 text-black"
                />
                <div className="w-full h-1/4 flex items-center justify-center">
                  <button
                    onClick={handleAddEvent}
                    className="bg-white text-[#326333] px-7 py-2 rounded cursor-pointer hover:bg-white/70 mt-4"
                    disabled={loading}
                  >
                    {loading ? "Adding event..." : "Add Event"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-6 py-2 lg:py-3 bg-[#326333] text-white rounded-md lg:hover:bg-red-600 transition cursor-pointer absolute bottom-10 lg:right-10"
      >
        Logout
      </button>
    </div>
  );
}
