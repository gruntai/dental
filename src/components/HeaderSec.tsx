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
      <p className="font-bold text-3xl mb-10 ">{title}</p>
      <div className="flex flex-wrap w-full">
        {cards.map((card, index) => (
          <div className="px-5 sm:w-1/2 md:w-1/4 h-full first:pl-0 last:pr-0 flex flex-grow">
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
