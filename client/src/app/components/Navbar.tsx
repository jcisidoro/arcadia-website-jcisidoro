"use client";

import Image from "next/image";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useNavigation } from "../providers/NavigationContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { currentPage } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`h-20 lg:h-24 fixed top-0 z-60 w-full flex items-center px-4 lg:px-6 justify-between ${
        scrolled
          ? "bg-[#f7f7f7]/90 transition-all duration-300 ease-in"
          : "bg-transparent transition-all duration-300 ease-out"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-12 lg:w-16 lg:h-14 relative hover:scale-90 transition-all duration-300 outline-none ${
            scrolled ? "bg-black rounded" : "bg-transparent"
          }`}
        >
          <Image src="/arcadiaLogo1.png" alt="Arcadia Logo" fill />
        </div>
        <span
          className={`uppercase font-cormorant font-bold text-2xl lg:text-4xl ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          Arcadia
        </span>
      </div>

      {/* Desktop Menu */}
      <ul
        className={`hidden md:flex items-center gap-10 ${
          scrolled ? "text-black" : "text-white"
        }`}
      >
        {[
          {
            href: "/pages/who-we-are",
            text: "Who we are",
          },
          { href: "/pages/events", text: "Events" },
          {
            href: "/pages/publications",
            text: "Publications",
          },
          {
            href: "/pages/about",
            text: "About",
          },
        ].map((item, index) => {
          const isActive = currentPage === item.href;
          return (
            <li key={index} className="group lg:text-lg xl:text-xl">
              <Link href={item.href}>
                <span
                  className={`block font-semibold ${
                    isActive
                      ? scrolled
                        ? "hover:scale-110 transition-all ease-in-out"
                        : "hover:scale-110 transition-all ease-in-out"
                      : ""
                  }`}
                >
                  {item.text}
                </span>
              </Link>
              <div
                className={`w-full border-b border-2 mt-1 ${
                  scrolled ? "border-black" : "border-white"
                } ${
                  isActive ? "scale-x-100" : "scale-x-0"
                } transform scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100`}
              />
            </li>
          );
        })}
      </ul>

      {/* Mobile Menu Button */}
      <div
        className={`flex md:hidden cursor-pointer ${
          scrolled ? "text-black" : "text-white"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CgMenuRightAlt size={32} />
      </div>

      {/* Mobile Burger Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#326333] text-white flex flex-col items-center justify-center transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-10 left-10"
        >
          <IoIosArrowDropleftCircle size={32} className="text-white" />
        </button>
        <ul className="text-center space-y-6">
          {[
            { href: "/pages/who-we-are", text: "Who we are" },
            { href: "/pages/events", text: "Events" },
            {
              href: "/pages/publications",
              text: "Publications",
            },
            {
              href: "/pages/about",
              text: "About",
            },
          ].map((item, index) => {
            const isActive = currentPage === item.href;

            return (
              <li key={index} onClick={() => setIsOpen(false)}>
                <Link href={item.href} className="text-xl">
                  <span
                    className={`${
                      isActive ? "bg-white text-[#326333] p-2 rounded" : ""
                    }`}
                  >
                    {item.text}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
