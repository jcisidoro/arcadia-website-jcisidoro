import Image from "next/image";
import { contact } from "@/app/utils/data";

export default function Footer() {
  return (
    <footer className="relative h-full w-full flex flex-col lg:flex-row items-center justify-center bg-black/45 p-4 lg:p-20 gap-4">
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

      {/* Left Content */}
      <div className="z-2 text-white w-full h-full">
        <h1 className="uppercase text-2xl lg:text-5xl font-extralight">
          Get in touch
        </h1>
        <p className="text-xs md:text-sm lg:text-lg leading-[2rem] lg:leading-[3rem] font-extralight mt-4">
          We understand that every firm has unique needs and requirements.
          That's why whether it's policy consulting, innovation solutions, or
          resource mobilization, our team will work closely with you to design a
          tailored approach that addresses your specific needs and challenges.
        </p>
      </div>

      {/* Right Content */}
      <div className="z-2 text-white w-full h-full flex flex-col items-end">
        {/* Arcadia Logo */}
        <div className="w-14 lg:w-24 h-12 lg:h-20 relative">
          <Image src="/arcadiaLogo1.png" alt="Arcadia Logo" fill />
        </div>
        {/* Contact Information */}
        {contact.map((person, index) => (
          <div
            key={index}
            className="text-sm lg:text-xl mt-2 flex flex-col leading-8 text-right"
          >
            <span className="font-semibold">{person.name}</span>
            <span>{person.number}</span>
            <span>{person.email}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}
