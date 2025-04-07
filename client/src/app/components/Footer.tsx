import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative h-full w-full flex flex-col items-center justify-center bg-black/45 p-4 gap-2">
      {/* Background Image */}
      <div className="absolute inset-0 -z-1">
        <Image
          src="/trees.jpg"
          alt="Footer Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col lg:flex-row w-full h-full lg:h-48">
        <div className="flex flex-col w-full h-full p-8 gap-4">
          <div className="flex flex-col w-full h-fit">
            <h1 className="text-white font-semibold uppercase text-xl xl:text-2xl leading-4">
              Sustainability Hub
            </h1>
            <span className="text-xs text-white">
              Smarter Cities, Greener Communities
            </span>
          </div>
          <div className="flex flex-col w-full h-full gap-1 xl:gap-2">
            <span className="text-white text-xl uppercase font-semibold">
              Arcadia
            </span>
            <p className="text-white text-sm text-justify">
              Arcadia is a sustainability hub for companies committed to
              advancing sustainability practices and accelerating the transition
              to a circular economy.
            </p>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row w-full h-full justify-between items-left xl:items-center p-8 gap-4 lg:gap-0">
          {[
            { buttonText: "Events", href: "/pages/events" },
            { buttonText: "Knowledge Portal", href: "#" },
            { buttonText: "Initiatives", href: "#" },
          ].map((item, index) => (
            <div className="flex flex-col group">
              <Link
                key={index}
                href={item.href}
                className="text-white cursor-pointer"
              >
                <span className="text-sm lg:text-base">{item.buttonText}</span>
              </Link>
              <div className="w-full border-1 border-white scale-x-0 origin-center group-hover:scale-x-100 transition-all duration-300 ease-in-out" />
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full h-full p-8 justify-between">
          <span className="text-white text-xl font-semibold">Contact Us</span>
          <div className="flex flex-col text-white">
            <span>For general inquiries:</span>
            <span>gsm.arcadia@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-center items-center justify-center w-full">
        <div className="flex flex-col -space-y-1.5 items-center">
          <div className="w-10 h-10 relative">
            <Image
              src="/arcadiaLogo1.png"
              alt="Arcadia Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-cormorant text-white text-sm uppercase">
            Arcadia
          </span>
        </div>
        <span className="text-white font-extralight">&copy; 2025 Arcadia</span>
      </div>
    </footer>
  );
}
