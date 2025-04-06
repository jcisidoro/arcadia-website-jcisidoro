"use client";
import React, { useEffect } from "react";

export default function BackgroundVideo() {
  useEffect(() => {
    const videoElement = document.querySelector("video");

    if (videoElement) {
      // Function to block mouse events
      const handleMouseEvent = (event: MouseEvent) => {
        event.preventDefault();
      };

      // Add event listeners to block all mouse interactions
      videoElement.addEventListener("contextmenu", handleMouseEvent); // Right-click

      // Cleanup event listeners on unmount
      return () => {
        videoElement.removeEventListener("contextmenu", handleMouseEvent);
      };
    }

    // If video element is not found, no event listeners are attached
  }, []);

  return (
    <video
      src="/video.mp4"
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      className="absolute w-[100vw] h-[100vh] object-cover z-1"
    />
  );
}
