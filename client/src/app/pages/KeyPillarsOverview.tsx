"use client";

import { useState } from "react";

export default function KeyPillarsOverview() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const content = [
    {
      title: "Events & Collaboration",
      description: (
        <div className="flex flex-col gap-4 text-xs lg:text-lg xl:text-2xl text-justify">
          <span className="font-bold">
            Arcadia serves as a platform that brings together youth, businesses,
            researchers, governments, and industry experts through forums,
            summits, workshops, and hackathons.
          </span>
          These events are designed to foster meaningful dialogue on
          sustainability challenges, share best practices, explore emerging
          policies, and discuss innovative solutions. By connecting diverse
          stakeholders, we facilitate knowledge exchange and the exploration of
          new topics critical to driving the sustainability agenda forward.
        </div>
      ),
    },
    {
      title: "Knowledge Hub",
      description: (
        <div className="flex flex-col gap-4 text-xs lg:text-lg xl:text-2xl text-justify">
          <span className="font-bold">
            Arcadia serves as a centralized resource for cutting-edge research,
            actionable insights, and real-world case studies that drive the
            transition to a circular economy.
          </span>
          <span className="font-bold">
            Our hub offers a wealth of knowledge, including detailed reports,
            expert recommendations, and impactful manifestos,
          </span>
          providing businesses, policymakers, and innovators with the tools they
          need to implement sustainable practices. By synthesizing global best
          practices and emerging trends, we empower stakeholders to make
          informed decisions and foster sustainable solutions that address
          pressing environmental challenges.
        </div>
      ),
    },
    {
      title: "Innovation & Solutions Exchange",
      description: (
        <div className="flex flex-col gap-4 text-xs lg:text-lg xl:text-2xl text-justify">
          <span className="font-bold">
            Arcadia collaborates with forward-thinking companies to showcase
            cutting-edge solutions and technologies that accelerate the
            transition to a circular economy.
          </span>
          Through our platform, we connect innovators, business, and industry
          leaders to exchange ideas and showcase scalable, impactful solutions
          that address sustainability challenges. We actively support
          initiatives that promote green growth and sustainable development,
          driving the adoption of advanced technologies and best practices
          across sectors. By fostering collaboration, we enable stakeholders to
          implement transformative strategies that reduce environmental impact
          and contribute to a sustainable, circular future.
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full lg:h-[800px] bg-white p-10 flex flex-col gap-4">
      <h1 className="text-2xl lg:text-5xl font-semibold">
        Key Pillars Overview
      </h1>
      <p className="text-sm lg:text-2xl text-justify">
        Arcadia's methodology revolves around fostering a continuous cycle of
        dialogue, knowledge sharing, and innovation, to empower stakeholders and
        drive meaningful sustainability outcomes. Our key pillars include:
      </p>
      <div className="flex flex-col lg:flex-row w-full h-full justify-center">
        <div className="flex flex-col w-full lg:w-[1000px] gap-4 lg:gap-10 justify-center items-center">
          {content.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer p-1.5 lg:p-4 w-[300px] sm:w-[350px] xl:w-[500px] rounded-xl text-white flex gap-3 transition-all duration-300 ${
                activeIndex === index
                  ? "bg-gradient-to-r from-[#0a9cab] via-[#3db789] to-[#7ed55f]" // Green if active
                  : "bg-gradient-to-r from-[#b3b3b3] via-[#d9d9d9] to-[#f5f5f5]" // Gray if inactive
              }`}
            >
              <div className="text-2xl lg:text-4xl xl:text-6xl font-thin flex items-center">{`0${
                index + 1
              }`}</div>
              <div className="font-bold text-sm lg:text-xl xl:text-2xl text-left items-center flex">
                {item.title}
              </div>
            </button>
          ))}
        </div>

        <div className="w-full h-full flex justify-center items-center px-10">
          {content[activeIndex].description}
        </div>
      </div>
    </div>
  );
}
