import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect } from "react";
import { SwitchComp } from "./Switch";
import SelectComp from "./Select";
import { Input } from "@/components/ui/input";
import { Bot, CalendarRange } from "lucide-react";

const features = [
  {
    icon: <Bot />, // Placeholder for icon path
    title: "Grunt human-like agents will call patients.",
    component: (
      isChecked: boolean,
      setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
    ) => <SwitchComp isChecked={isChecked} setIsChecked={setIsChecked} />,
    width: "14",
    height: "16",
  },
  {
    icon: "phone.svg", // Placeholder for icon path
    title: "Engage in text conversations with patients.",
    component: (
      isChecked: boolean,
      setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
    ) => <SwitchComp isChecked={isChecked} setIsChecked={setIsChecked} />,
    width: "11",
    height: "16",
  },
  {
    icon: "mail.svg", // Placeholder for icon path
    title: "Allow Grunt to email patients.",
    component: (
      isChecked: boolean,
      setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
    ) => <SwitchComp isChecked={isChecked} setIsChecked={setIsChecked} />,
    width: "16",
    height: "11",
  },
];

function TakeActionContent2({
  setIsSaveBtnDisabled,
}: {
  setIsSaveBtnDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isCallChecked, setIsCallChecked] = React.useState(false);
  const [isTextChecked, setIsTextChecked] = React.useState(false);
  const [isEmailChecked, setIsEmailChecked] = React.useState(false);

  // Enable the save button if any of the switches are toggled
  useEffect(() => {
    if (isCallChecked || isTextChecked || isEmailChecked) {
      setIsSaveBtnDisabled(false);
    } else {
      setIsSaveBtnDisabled(true);
    }
  }, [isCallChecked, isTextChecked, isEmailChecked]);

  return (
    <div>
      <div className="mb-8">
        <p className="text-[#606060] font-semibold text-lg">
          Turn on Automatic Patient Scheduling
        </p>
        <p className="text-[#A2A3A7] text-sm font-semibold">
          Don’t miss another call! Give Grunt permission to schedule patients.
        </p>
      </div>
      <div className="space-y-7 mb-5">
        {features.map((feature, index) => (
          <div className="flex items-center gap-5 justify-between" key={index}>
            <div className="flex items-center gap-5">
              <div className="w-5 h-5 flex items-center justify-center">
                {typeof feature.icon == "string" ? (
                  <Image
                    src={`/assets/images/icons/${feature.icon}`}
                    alt={feature.title}
                    width={+feature.width}
                    height={+feature.height}
                  />
                ) : (
                  feature.icon
                )}
              </div>
              <p className="text-sm text-[#7D7D7D] font-semibold">
                {feature.title}
              </p>
            </div>
            {feature.component(
              index === 0
                ? isCallChecked
                : index === 1
                ? isTextChecked
                : isEmailChecked,
              index === 0
                ? setIsCallChecked
                : index === 1
                ? setIsTextChecked
                : setIsEmailChecked
            )}
          </div>
        ))}
      </div>
      <div className="space-y-5">
        <p className="text-[#545454] text-lg font-semibold">
          Test how it works
        </p>
        <div className="bg-[#F6F7FD] p-5 flex items-center gap-5">
          <Image
            alt="bitcoin logo"
            src="/assets/images/bitcoin.svg"
            width={38}
            height={38}
          />
          <div className="space-y-2">
            <p className="text-[#95989F] text-xs font-semibold">
              Enter your number and select a communication method
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Input
                className="h-8 border-black w-full sm:w-40"
                placeholder="+1"
              />
              <Button className="bg-[#28A745] hover:bg-[#28A745]/80 rounded-[5px] h-8 w-full sm:w-fit">
                Call
              </Button>
              <Button
                className="bg-transparent border-black h-8 text-black rounded-[5px] w-full sm:w-fit"
                variant={"outline"}
              >
                Text
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TakeActionContent2;
