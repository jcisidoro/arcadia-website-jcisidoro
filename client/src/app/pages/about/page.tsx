import BackgroundVideo from "@/app/components/BackgroundVideo";
import KeyPillarsOverview from "../KeyPillarsOverview";
import Projects from "../Projects";
import ContactUs from "../ContactUs";
import Loading from "@/app/components/Loading";
import { Suspense } from "react";

export default function AboutPage() {
  return (
    <div className="bg-black">
      <Suspense fallback={<Loading />}>
        <ContactUs />
      </Suspense>
      <div className="flex w-full flex-col" id="about-arcadia">
        <BackgroundVideo width="w-[100vw]" height="h-[100vh]" />

        <div className="flex flex-col w-full h-[100vh] justify-center items-center px-10 lg:px-20">
          <h1 className="text-white z-1 font-cormorant text-4xl lg:text-5xl xl:text-7xl text-center font-bold mb-4">
            About Arcadia
          </h1>
          <p className="text-white z-1 font-cormorant text-xl lg:text-3xl xl:text-5xl text-center">
            a sustainability hub for companies committed to advancing
            sustainability practices and accelerating the transition to a
            circular economy.
          </p>
          <p className="text-xl lg:text-3xl xl:text-5xl mt-4 z-1 text-white font-cormorant text-center">
            As a hub, it facilitates the exchange of leading sustainability
            practices and resources, fostering the development of cost-effective
            and efficient to solutions to sustainability challenges.
          </p>
        </div>
      </div>

      <KeyPillarsOverview />
      <Projects />
    </div>
  );
}
