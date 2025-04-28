"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useToast } from "../components/provider/ToastContext";
import Link from "next/link";

type PartnerType = {
  id: string;
  imageUrl: string;
  description: string;
};

export default function InnovationsAndSolutionsExchange() {
  const { showToast } = useToast();

  const [partners, setPartners] = useState<PartnerType[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/partners`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setPartners(data);
        } else {
          console.error("Unexpected response format:", data);
          showToast("Error fetching company partners", "error");
        }
      } catch (error) {
        console.error("Error company partners:", error);
        showToast("Error fetching company partners", "error");
      }
    };

    fetchPartners();
  }, []);
  return (
    <div className="w-full h-full bg-white p-4 lg:p-10 gap-4 flex flex-col">
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-4xl font-bold text-black">
          Innovations and Solutions Exchange
        </h1>
        <span className="text-sm md:text-base text-justify text-black font-medium">
          List of Arcadia&apos;s Partnered and Accredited Solutions.
        </span>
        <span className="text-sm md:text-base text-justify text-black font-medium">
          Contact us if you&apos;d like the opportunity to be included.
        </span>
      </div>

      <div className="flex flex-col gap-4 mt-4 items-center">
        {partners.length === 0 ? (
          <div className="flex items-center justify-center text-center text-lg text-black w-full h-96">
            <p className="font-cormorant font-semibold text-xl lg:text-3xl">
              No partners found at the moment. Please check back soon.
            </p>
          </div>
        ) : (
          partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col lg:grid grid-cols-[400px_1fr] w-full h-full gap-4 items-center"
            >
              <div className="w-[320px] sm:w-96 h-48 relative">
                <Image
                  unoptimized
                  src={partner.imageUrl}
                  alt={partner.description}
                  fill
                  className="object-cover shadow-lg shadow-black/50 rounded"
                />
              </div>
              <div className="text-black text-justify 2xl:text-xl">
                {partner.description}
              </div>
            </div>
          ))
        )}

        <Link
          href={{
            pathname: "/pages/about",
            query: {
              notes:
                "We are interested in partnering with Arcadia and being listed as an official partner. We believe that a collaboration between our organizations would be mutually beneficial, and we are eager to explore how we can contribute to the success of Arcadia's partner network.",
            },
          }}
          className="flex bg-[#326333] text-white p-3 rounded w-56 cursor-pointer hover:scale-105 duration-300 transition-all justify-center"
        >
          Get listed with Arcadia
        </Link>
      </div>
    </div>
  );
}
