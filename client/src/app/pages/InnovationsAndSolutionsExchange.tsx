import Image from "next/image";
import React from "react";

export default function InnovationsAndSolutionsExchange() {
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

      <div className="flex flex-col gap-4 mt-4">
        {[
          {
            src: "/oases.png",
            alt: "Oases Image",
            description:
              "A sustainability consulting firm that helps clients with total transformation -- driving complex change, enabling sustainable growth, and driving bottomline impact.",
          },
          {
            src: "/ecoAI.png",
            alt: "Eco AI Image",
            description:
              "The all-in-one platform for carbon management and climate action-powered by AI. eco.AI simplifies sustainability for organizations by automating carbon tracking, generating ESG reports, and enabling nature-based offsetting-all in one localized, intelligent platform.",
          },
          {
            src: "/ecobloom.png",
            alt: "Ecobloom Image",
            description: (
              <p>
                Ecobloom is an eco-friendly packaging solution. <br />
                This sustainable alternative to plastic and paper packaging aims
                to reduce environmental waste while providing durable and
                biodegradable packaging for various industries (e-commerce,
                logistics, and retail).
              </p>
            ),
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:grid grid-cols-[400px_1fr] w-full h-full gap-4 items-center"
          >
            <div className="w-[320px] sm:w-96 h-48 relative">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover shadow-lg shadow-black/50 rounded"
              />
            </div>
            <div className="text-black text-justify 2xl:text-xl">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
