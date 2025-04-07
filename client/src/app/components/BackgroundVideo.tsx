"use client";
import React, { useEffect } from "react";

interface BackgroundVideoProps {
  width?: string;
  height?: string;
  className?: string;
}

export default function BackgroundVideo({
  width,
  height,
  className,
}: BackgroundVideoProps) {
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
      className={`absolute ${width} ${height} object-cover z-1 ${className}`}
    />
  );
}
