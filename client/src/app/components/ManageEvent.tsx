// /components/ManageEvent.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdEvent } from "react-icons/md";
import { useToast } from "./provider/ToastContext";
import { useIsMobile } from "@/app/components/hooks/useIsMobile";
import { EventForm } from "./forms/EventsForm";
import { EventModal } from "./modals/EventsModal";

interface Event {
  _id: string;
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
  const isMobile = useIsMobile();

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/upcoming-events`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      showToast("Error fetching events", "error");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleClear = () => {
    setTitle("");
    setSpeakers("");
    setAttendees("");
    setDescription("");
    setDescription1("");
    setEventLink("");
    setFromDate("");
    setToDate("");
    setImageFile(null);
    setExistingImageUrl(null);
    setSelectedEventId(null);
    setResetKey((prev) => prev + 1);
  };

  const resetSelectedCard = () => {
    setSelectedEventId(null);
    setTitle("");
    setSpeakers("");
    setAttendees("");
    setDescription("");
    setDescription1("");
    setEventLink("");
    setFromDate("");
    setToDate("");
    setImageFile(null);
    setExistingImageUrl(null);
  };

  const handleEditEvent = async (eventId: string) => {
    const eventData = {
      title,
      speakers,
      attendees,
      description,
      description1,
      eventLink,
      fromDate,
      toDate,
      imageUrl: existingImageUrl || undefined,
    };

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const uploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );
      const uploadData = await uploadRes.json();
      if (uploadData.imageUrl) {
        eventData.imageUrl = uploadData.imageUrl;
      }
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok) {
        showToast("Event updated successfully", "success");
        fetchEvents();
        handleClear();
      } else {
        showToast(data.message || "Failed to update event", "error");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      showToast("Error updating event", "error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-[#326333] p-4 rounded gap-4 overflow-y-auto">
      {/* Sidebar/Form Section */}
      {isMobile ? (
        <EventModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          handleClear={handleClear}
          form={
            <EventForm
              title={title}
              setTitle={setTitle}
              speakers={speakers}
              setSpeakers={setSpeakers}
              attendees={attendees}
              setAttendees={setAttendees}
              description={description}
              setDescription={setDescription}
              description1={description1}
              setDescription1={setDescription1}
              eventLink={eventLink}
              setEventLink={setEventLink}
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              imageFile={imageFile}
              setImageFile={setImageFile}
              existingImageUrl={existingImageUrl}
              resetKey={resetKey}
              selectedEventId={selectedEventId}
              handleEditEvent={handleEditEvent}
              showToast={showToast}
            />
          }
          resetSelectedCard={resetSelectedCard}
        />
      ) : (
        <div className="flex flex-col w-full md:w-72 lg:w-96 xl:w-[400px] h-auto md:h-[650px] lg:h-full">
          <div className="flex w-full items-center justify-between">
            <h1 className="flex gap-1 font-medium text-white p-4">
              <MdEvent size={24} className="text-white" /> Manage Event
            </h1>
            <button
              onClick={handleClear}
              className="bg-white/50 w-16 h-8 rounded text-white text-sm cursor-pointer hover:scale-105 transition-all duration-300"
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col w-full h-full gap-4 bg-white/50 p-4 rounded overflow-y-auto">
            <EventForm
              title={title}
              setTitle={setTitle}
              speakers={speakers}
              setSpeakers={setSpeakers}
              attendees={attendees}
              setAttendees={setAttendees}
              description={description}
              setDescription={setDescription}
              description1={description1}
              setDescription1={setDescription1}
              eventLink={eventLink}
              setEventLink={setEventLink}
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              imageFile={imageFile}
              setImageFile={setImageFile}
              existingImageUrl={existingImageUrl}
              resetKey={resetKey}
              selectedEventId={selectedEventId}
              handleEditEvent={handleEditEvent}
              showToast={showToast}
            />
          </div>
        </div>
      )}

      {/* Event List Section */}
      <div className="flex flex-col w-full h-[650px] lg:h-full">
        <h1 className="flex text-white items-center font-medium p-4">
          Select Event to Edit
        </h1>

        {isMobile && (
          <button
            onClick={() => {
              handleClear();
              setModalOpen(true);
            }}
            className="mb-2 bg-white text-[#326333] font-semibold py-2 px-4 rounded shadow hover:bg-gray-100 transition"
          >
            + Add Event
          </button>
        )}

        <div className="flex flex-col w-full h-full gap-4 bg-white/50 p-4 rounded overflow-y-auto">
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
                setSelectedEventId(event._id);
                if (isMobile) setModalOpen(true);
              }}
              className="flex flex-col lg:flex-row gap-2 w-full cursor-pointer"
            >
              <div className="hidden lg:flex w-full lg:w-2/5 h-full relative bg-[#326333] rounded overflow-hidden">
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

              <div className="flex flex-col justify-between w-full bg-white p-4 rounded text-black">
                <h3 className="font-bold font-cormorant text-3xl text-[#326333]">
                  {event.title}
                </h3>
                <div className="hidden lg:flex flex-col">
                  <span className="font-semibold text-base">Speakers:</span>
                  <span className="text-sm">{event.speakers}</span>
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="font-semibold text-base">Attendees:</span>
                  <span className="text-sm">{event.attendees}</span>
                </div>
                <div className="hidden lg:flex flex-col truncate">
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
    </div>
  );
}
