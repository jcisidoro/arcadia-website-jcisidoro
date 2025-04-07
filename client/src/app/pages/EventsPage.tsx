import BackgroundVideo from "../components/BackgroundVideo";

export default function EventsPage() {
  return (
    <div>
      <BackgroundVideo width="w-[100vw]" height="h-[100vh]" />
      <div className="w-full h-[100vh]">
        <div className="flex w-full h-full justify-center items-center px-20">
          <h1 className="text-white z-1 font-cormorant text-5xl xl:text-7xl text-center">
            Foster discourse and drive actionable sustainability solutions
          </h1>
        </div>
      </div>
    </div>
  );
}
