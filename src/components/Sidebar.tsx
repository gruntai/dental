import Image from "next/image";
import React from "react";
import { Card } from "./ui/card";
import { PanelRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardData, ReusableCard } from "./reusableCard";

function Sidebar({
  isOpened,
  handleOpenState,
}: {
  isOpened: boolean;
  handleOpenState: (arg: boolean) => void;
}) {
  return (
    <aside
      className={cn(
        "w-[350px] h-screen fixed left-0 top-16 pt-10 hidden z-40 lg:block bg-[#F7F7F7] slide-out-to-left-[300px] duration-500",
        {
          "-translate-x-[290px]": isOpened,
          // "slide-out-to-left-[300px]": isOpened,
        }
      )}
    >
      {/* logo */}
      {/* <div className="h-16 flex items-center bg-white mb-5 border-b border-black">
        <Image
          src="/assets/images/logos/grunt_logo.png"
          alt="grunt logo"
          width={150}
          height={30}
          className="pl-5"
        />
      </div> */}
      {/* <Button variant={"ghost"} className=""> */}
      <PanelRight
        className="absolute right-5 top-7 w-5 h-5 opacity-50 cursor-pointer z-40"
        onClick={() => handleOpenState(!isOpened)}
      />
      {/* </Button> */}

      <div
        className={cn("px-5 space-y-5 duration-100", {
          "opacity-0": isOpened,
        })}
      >
        <span className="border rounded-lg px-3 py-1.5 text-[#7D7D7D] text-xs font-semibold flex items-center gap-2 w-fit bg-white">
          <Image
            src={"/assets/images/flag.png"}
            width={20}
            height={20}
            alt="flag image"
          />
          AGENT INSTRUCTIONS
        </span>
        {cardData.map((card, index) => (
          <ReusableCard
            key={index}
            imageSrc={card.imageSrc}
            alt={card.alt}
            title={card.title}
            description={card.description}
            children={card.children}
          />
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
