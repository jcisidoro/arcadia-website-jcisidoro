// /components/ManageEvent.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdEvent } from "react-icons/md";
import { FileUploadDemo } from "./FileUpload";
import { useToast } from "./provider/ToastContext";

interface Event {
  title: string;
  speakers: string;
  attendees: string;
  description: string;
  description1?: string;
  eventLink: string;
  fromDate: string;
  toDate: string;
  imageUrl?: string;
}

export default function ManageEvent() {
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [speakers, setSpeakers] = useState("");
  const [attendees, setAttendees] = useState("");
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [events, setEvents] = useState<Event[]>([]);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [, setImageFile] = useState<File | null>(null);

  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events`
        );
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        showToast("Error fetching events:", "error");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex w-full h-full rounded gap-4">
      {/* CONTENT 1 */}
      <div className="hidden lg:flex flex-col w-full lg:w-1/3 max-h-full p-4 gap-4 bg-[#326333] rounded">
        <div className="flex gap-1 font-medium text-white">
          <MdEvent size={24} className="text-[#326333]" /> Manage Event
        </div>

        <div className="flex flex-col w-full h-full overflow-y-auto">
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
              className="bg-white p-4 outline-none w-full rounded-xl mb-2 text-black"
            />
          ))}
          <FileUploadDemo
            onChange={(file: File) => {
              setImageFile(file);
            }}
            resetKey={resetKey}
            key={resetKey}
            existingImageUrl={existingImageUrl}
          />
          <div className="w-full h-full flex flex-col mt-2">
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
                  className="bg-white p-4 outline-none w-full rounded-xl mb-2 text-black"
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
                className="bg-white p-4 outline-none w-full rounded-xl mb-2 h-32 resize-none text-black"
              />
            ))}
            <input
              type="text"
              value={eventLink}
              onChange={(e) => setEventLink(e.target.value)}
              placeholder="Add event link"
              className="bg-white p-4 outline-none w-full rounded-xl mb-2 text-black"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            //   onClick={handleAddEvent}
            className="bg-white text-black px-7 py-2 rounded cursor-pointer hover:bg-white/80 transition-all duration-300"
            // disabled={loading}
          >
            {/* {loading ? "Adding event..." : "Add Event"} */} Add Event
          </button>
        </div>
      </div>

      {/* CONTENT 2 */}
      <div className="flex flex-col w-full lg:w-2/3 h-full p-4 bg-[#326333] rounded overflow-y-auto gap-4">
        {events.map((event, index) => (
          <button
            key={index}
            onClick={() => {
              setTitle(event.title);
              setSpeakers(event.speakers);
              setAttendees(event.attendees);
              setDescription(event.description);
              setDescription1(event.description1 || "");
              setEventLink(event.eventLink || "");
              setFromDate(event.fromDate?.substring(0, 10));
              setToDate(event.toDate?.substring(0, 10));
              setExistingImageUrl(event.imageUrl || null);
              setResetKey((prev) => prev + 1);
            }}
            className="flex flex-col lg:flex-row gap-2 w-full bg-white/50 p-2 cursor-pointer rounded"
          >
            {/* Image section */}
            <div className="w-full lg:w-2/5 h-full relative bg-[#326333] rounded overflow-hidden">
              {event.imageUrl && (
                <Image
                  unoptimized
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Info section */}
            <div className="flex flex-col justify-between w-full bg-white p-4 rounded text-black">
              <h3 className="font-bold font-cormorant text-3xl text-[#326333]">
                {event.title}
              </h3>
              <div className="flex flex-col">
                <span className="font-semibold text-base">Speakers:</span>
                <span className="text-sm">{event.speakers}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base">Attendees:</span>
                <span className="text-sm">{event.attendees}</span>
              </div>
              <div className="flex flex-col truncate">
                <span className="font-semibold text-base">Link:</span>
                <span className="text-sm">{event.eventLink}</span>
              </div>
              <div className="text-xs text-gray-500 mt-4">
                {event.fromDate?.substring(0, 10)} →{" "}
                {event.toDate?.substring(0, 10)}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
