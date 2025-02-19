"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect } from "react";
import { SwitchComp } from "./Switch";
import SelectComp from "./Select";
import { Input } from "@/components/ui/input";
import { CustomDialog } from "../Dialog";
import { AlarmClock, Ambulance, CalendarRangeIcon } from "lucide-react";

const selectItems = [
  { value: "7d", label: "7 Days" },
  { value: "1m", label: "1 Month" },
  { value: "3m", label: "3 Month" },
  { value: "6m", label: "6 Month" },
  { value: "1y", label: "1 Year" },
];

const features = [
  {
    icon: <CalendarRangeIcon />, // Placeholder for icon path
    title: "Connect with your appointment system",
    component: (
      isLoggedin: boolean,
      setIsloggedIn: React.Dispatch<React.SetStateAction<boolean>>
    ) => (
      <CustomDialog
        isLoggedin={isLoggedin}
        setIsloggedIn={setIsloggedIn}
        title="Connect with your appointment system"
      />
    ),
    width: "14",
    height: "16",
  },
  {
    icon: <Ambulance />, // Placeholder for icon path
    title: "Enable same emergency appointments",
    component: (
      isChecked: boolean,
      setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
    ) => <SwitchComp isChecked={isChecked} setIsChecked={setIsChecked} />,
    width: "13",
    height: "16",
  },
  {
    icon: <AlarmClock />, // Placeholder for icon path
    title: "Grunt should take over after how many calls?",
    component: (
      _,
      setIsSelectValueChanged: React.Dispatch<React.SetStateAction<boolean>>
    ) => (
      <SelectComp data={selectItems} checkIsChanged={setIsSelectValueChanged} />
    ),
    width: "16",
    height: "11",
  },
];

const defaultValues = {
  isConnected: false,
  isChecked: false,
};

function TakeActionContent1({
  setIsSaveBtnDisabled,
}: {
  setIsSaveBtnDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isConnected, setIsConnected] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isSelectValueChanged, setIsSelectValueChanged] = React.useState(false);

  useEffect(() => {
    if (isConnected || isChecked || isSelectValueChanged) {
      setIsSaveBtnDisabled(false);
    } else {
      setIsSaveBtnDisabled(true);
    }
  }, [isConnected, isChecked, isSelectValueChanged]);
  console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");

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
      <div className="space-y-5 mb-5">
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
            {typeof feature.component === "function"
              ? feature.component(
                  index === 0
                    ? isConnected
                    : index === 1
                    ? isChecked
                    : isSelectValueChanged,
                  index === 0
                    ? setIsConnected
                    : index === 1
                    ? setIsChecked
                    : setIsSelectValueChanged
                )
              : feature.component}
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

export default TakeActionContent1;
