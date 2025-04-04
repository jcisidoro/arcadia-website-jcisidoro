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

      // Function to block keyboard events
      const handleKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
      };

      // Add event listeners to block all mouse interactions
      videoElement.addEventListener("mousedown", handleMouseEvent);
      videoElement.addEventListener("mouseup", handleMouseEvent);
      videoElement.addEventListener("click", handleMouseEvent);
      videoElement.addEventListener("contextmenu", handleMouseEvent); // Right-click

      // Add event listener to block all keyboard interactions
      document.addEventListener("keydown", handleKeyDown); // Keyboard keydown events
      document.addEventListener("keypress", handleKeyDown); // Keyboard keypress events
      document.addEventListener("keyup", handleKeyDown); // Keyboard keyup events

      // Cleanup event listeners on unmount
      return () => {
        videoElement.removeEventListener("mousedown", handleMouseEvent);
        videoElement.removeEventListener("mouseup", handleMouseEvent);
        videoElement.removeEventListener("click", handleMouseEvent);
        videoElement.removeEventListener("contextmenu", handleMouseEvent);

        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keypress", handleKeyDown);
        document.removeEventListener("keyup", handleKeyDown);
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
