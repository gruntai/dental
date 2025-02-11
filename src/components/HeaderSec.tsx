import React from "react";

export function HeaderSec({
  title,
  cards,
}: {
  title: string;
  cards: {
    title: string;
    stat: string;
  }[];
}) {
  return (
    <div>
      <p className="font-bold text-2xl sm:text-3xl mb-10 ">{title}</p>
      <div className="flex flex-wrap w-full justify-between gap-y-5">
        {cards.map((card, index) => (
          <div className="w-full sm:w-[48%] md:w-[30%] lg:w-[23%]">
            <div
              key={index}
              className="bg-[#F7F7F7] border border-black rounded-2xl px-6 py-7 h-full w-full"
            >
              <p className="font-semibold  text-sm mb-2 text-[#686869]">
                {card.title}
              </p>
              <p className="font-semibold text-3xl">{card.stat}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeaderSec;
