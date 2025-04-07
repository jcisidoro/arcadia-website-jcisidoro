import Image from "next/image";
import BackgroundVideo from "../components/BackgroundVideo";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <BackgroundVideo width="w-[100vw]" height="h-[100vh]" />
      <div className="w-full h-[100vh]">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="w-64 h-64 relative z-1">
            <Image
              src="/arcadiaLogo1.png"
              alt="Arcadia Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1 items-center mb-5 z-1">
            <h1 className="text-white uppercase text-6xl lg:text-7xl tracking-[0.5rem] font-cormorant font-semibold">
              Arcadia
            </h1>
            <div className="w-full h-0.5 bg-white"></div>
            <p className="text-white text-xl uppercase font-semibold tracking-[0.3rem]">
              Sustainability Hub
            </p>
          </div>

          <p className="text-white text-2xl mt-5 z-1 text-center">
            Driving Progress Towards a{" "}
            <span className="font-bold">Circular Economy</span>
          </p>
          <Link href="/pages/events" className="z-1">
            <button className="text-white cursor-pointer px-7 py-3 lg:px-7 lg:py-3 border-1 mt-4 font-cormorant text-2xl lg:text-3xl hover:bg-white hover:text-black duration-300">
              Join Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
