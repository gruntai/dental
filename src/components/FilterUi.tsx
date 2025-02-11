import React from "react";
import { Button } from "./ui/button";

function FilterUi({
  title,
  cards,
}: {
  title: string;
  cards: {
    title: string;
  }[];
}) {
  return (
    <div className="flex flex-col xl:flex-row  gap-5">
      <p className="font-semibold text-xl">{title}</p>
      <div className="flex flex-wrap gap-5">
        {cards.map((card, index) => (
          <Button
            key={index}
            className="bg-[#F7F7F7] border border-black rounded-2xl px-5 py-1.5 font-medium text-xs cursor-pointer h-auto text-black hover:bg-[#ebebeb]"
          >
            {card.title}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default FilterUi;
