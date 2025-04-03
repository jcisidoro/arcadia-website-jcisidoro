import Image from "next/image";
import { contact } from "@/app/utils/data";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="relative h-full w-full flex flex-col items-center justify-center bg-black/45 p-4 lg:p-12 gap-4">
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

      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex w-full flex-col">
          {/* Left Content */}
          <div className="z-2 text-white w-full h-full flex flex-col">
            {/* Arcadia Logo */}
            <div className="flex w-full items-center">
              <div className="w-14 lg:w-24 h-12 lg:h-20 relative">
                <Image src="/arcadiaLogo1.png" alt="Arcadia Logo" fill />
              </div>
              <h1 className="uppercase text-2xl lg:text-5xl font-bold font-cormorant">
                Get in touch
              </h1>
            </div>
          </div>

          <div className="z-2 text-white w-full h-full">
            <p className="text-xs md:text-sm lg:text-lg leading-[2rem] lg:leading-[2.5rem] font-extralight mt-4 text-justify">
              We understand that every firm has unique needs and requirements.
              That&apos;s why whether it&apos;s policy consulting, innovation
              solutions, or resource mobilization, our team will work closely
              with you to design a tailored approach that addresses your
              specific needs and challenges.
            </p>

            {/* Contact Information */}
            {contact.map((person, index) => (
              <div
                key={index}
                className="text-sm lg:text-xl mt-4 flex flex-col leading-8"
              >
                <span className="font-semibold">{person.name}</span>
                <span>{person.number}</span>
                <span>{person.email}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col h-auto w-full p-4 items-center justify-center mt-4">
          {/* Icons here */}
          <div className="flex h-32 w-full items-center justify-center gap-8">
            {[
              {
                icon: <FaFacebook />,
                iconText: "Like & Follow us on Facebook",
              },
              {
                icon: <FaInstagram />,
                iconText: "See our latest updates on Instagram",
              },
              {
                icon: <FaXTwitter />,
                iconText: "Join the conversation on Twitter",
              },
              {
                icon: <IoLogoWhatsapp />,
                iconText: "Chat with us on WhatsApp",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center group lg:relative"
              >
                {/* Hover Text (Initially Hidden) */}
                <span className="absolute text-nowrap -top-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.iconText}
                </span>

                {/* Social Media Icon Button */}
                <button className="text-4xl text-white cursor-pointer hover:scale-110 transition-all duration-300">
                  {item.icon}
                </button>
              </div>
            ))}
          </div>
          <span className="text-white text-center font-extralight">
            Be Part of Our Community - Follow Us
          </span>
        </div>
      </div>

      <div className="flex text-center w-full justify-center mt-10">
        <span className="text-white font-extralight">
          &copy; 2025 Arcadia - Sustainability Hub. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
