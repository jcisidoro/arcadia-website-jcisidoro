export default function BackgroundVideo() {
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
