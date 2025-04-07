import Link from "next/link";

export default function AboutIntro() {
  return (
    <div className="w-full bg-white h-full lg:h-[500px] mt-0.5 flex items-center justify-center">
      <div className="flex flex-col p-4 text-center gap-10 mx-4 xl:mx-32">
        <h1 className="text-3xl lg:text-5xl">
          <span className="font-bold text-[#326333]">About </span>
          <span className="lg:text-6xl font-cormorant font-extrabold uppercase text-black">
            Arcadia
          </span>
        </h1>
        <p className="text-lg lg:text-2xl text-black">
          <span className="italic text-[#1d241d] font-bold font-cormorant lg:text-3xl uppercase">
            Arcadia{" "}
          </span>
          is a sustainability hub for companies committed to advancing
          sustainability practices and accelerating the transition to a circular
          economy.
        </p>

        <p className="text-sm lg:text-xl font-bold mt-4 text-black">
          As a hub, it facilitates the exchange of leading sustainability
          practices and resources, fostering the development of cost-effective
          and efficient to solutions to sustainability challenges.
        </p>
        <Link href="/pages/about">
          <button className="text-black cursor-pointer p-2 lg:p-4 border-1 mt-2 lg:mt-4 font-cormorant text-xl lg:text-3xl hover:bg-black hover:text-white duration-300">
            More about <span className="uppercase">Arcadia</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
