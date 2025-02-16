import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { SwitchComp } from "./Switch";
import SelectComp from "./Select";
import { Input } from "@/components/ui/input";

const selectItems = [
  { value: "7d", label: "7 Days" },
  { value: "1m", label: "1 Month" },
  { value: "3m", label: "3 Month" },
  { value: "6m", label: "6 Month" },
  { value: "1y", label: "1 Year" },
];

const selectItems2 = [
  { value: "4", label: "4" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  // Add more items as needed
];
const features = [
  {
    icon: "mic.svg", // Placeholder for icon path
    title: "Connect with your appointment system",
    component: () => (
      <Button className="bg-[#28A745] hover:bg-[#28A745]/80 rounded-[5px] h-7">
        Connect
      </Button>
    ),
    width: "14",
    height: "16",
  },
  {
    icon: "phone.svg", // Placeholder for icon path
    title: "Engage with patient via SMS and Calls.",
    component: () => <SwitchComp />,
    width: "11",
    height: "16",
  },
  {
    icon: "mail.svg", // Placeholder for icon path
    title: "Automatically swap patient if no response.",
    component: () => <SwitchComp />,
    width: "16",
    height: "11",
  },
  {
    icon: "mail.svg", // Placeholder for icon path
    title: "How many attempts before swapping patient?",
    component: () => <SelectComp data={selectItems2} />,
    width: "16",
    height: "11",
  },
  {
    icon: "mail.svg", // Placeholder for icon path
    title: "Call patients how many days before their appointment?",
    component: () => <SelectComp data={selectItems} />,
    width: "16",
    height: "11",
  },
];

export function NoShow() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-[#606060] font-semibold text-lg">
          Turn on Automatic No Show Detection{" "}
        </p>
        <p className="text-[#A2A3A7] text-sm font-semibold">
          Give Grunt the permissions to detect no shows.{" "}
        </p>
      </div>
      <div className="space-y-7 mb-5">
        {features.map((feature, index) => (
          <div className="flex items-center  justify-between">
            <div key={index} className="flex items-center gap-5">
              <div className="w-5 h-5 flex items-center justify-center ">
                <Image
                  src={`/assets/images/icons/${feature.icon}`}
                  alt={feature.title}
                  width={+feature.width}
                  height={+feature.height}
                />
              </div>
              <p className="text-sm text-[#7D7D7D] font-semibold">
                {feature.title}
              </p>
            </div>
            {feature.component()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoShow;
