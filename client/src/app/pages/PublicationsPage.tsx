import BackgroundVideo from "../components/BackgroundVideo";

export default function PublicationsPage() {
  return (
    <div>
      <BackgroundVideo width="w-[100vw]" height="h-[100vh]" />
      <div className="w-full h-[100vh]">
        <div className="flex w-full h-full justify-center items-center px-20">
          <h1 className="text-white z-1 font-cormorant text-5xl xl:text-7xl text-center">
            Your knowledge hub for waste management
          </h1>
        </div>
      </div>
    </div>
  );
}
