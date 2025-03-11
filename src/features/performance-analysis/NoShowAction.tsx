import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SwitchComp } from "./Switch";
import SelectComp from "./Select";
import { Input } from "@/components/ui/input";
import { CustomDialog } from "../Dialog";
import { AlarmClock, CalendarRange, RefreshCw } from "lucide-react";

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
    icon: <CalendarRange />, // Placeholder for icon path
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
    icon: "phone.svg", // Placeholder for icon path
    title: "Engage with patient via SMS and Calls.",
    component: (
      isChecked: boolean,
      setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
    ) => <SwitchComp isChecked={isChecked} setIsChecked={setIsChecked} />,
    width: "13",
    height: "16",
  },
  {
    icon: <RefreshCw />, // Placeholder for icon path
    title: "Automatically swap patient if no response.",
    component: (
      isChecked: boolean,
      setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
    ) => <SwitchComp isChecked={isChecked} setIsChecked={setIsChecked} />,
    width: "20",
    height: "11",
  },
  {
    icon: "mic.svg", // Placeholder for icon path
    title: "How many attempts before swapping patient?",
    component: (
      _: any,
      setIsSelectValueChanged: React.Dispatch<React.SetStateAction<boolean>>
    ) => (
      <SelectComp
        data={selectItems2}
        checkIsChanged={setIsSelectValueChanged}
      />
    ),
    width: "16",
    height: "11",
  },
  {
    icon: <AlarmClock />, // Placeholder for icon path
    title: "Call patients how many days before their appointment?",
    component: (
      _: any,
      setIsSelectValueChanged: React.Dispatch<React.SetStateAction<boolean>>
    ) => (
      <SelectComp data={selectItems} checkIsChanged={setIsSelectValueChanged} />
    ),
    width: "16",
    height: "11",
  },
];

export function NoShow({
  setIsSaveBtnDisabled,
}: {
  setIsSaveBtnDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isSelectValueChanged1, setIsSelectValueChanged1] = useState(false);
  const [isSelectValueChanged2, setIsSelectValueChanged2] = useState(false);

  useEffect(() => {
    if (
      isConnected ||
      isChecked1 ||
      isChecked2 ||
      isSelectValueChanged1 ||
      isSelectValueChanged2
    ) {
      setIsSaveBtnDisabled(false);
    } else {
      setIsSaveBtnDisabled(true);
    }
  }, [
    isConnected,
    isChecked1,
    isChecked2,
    isSelectValueChanged1,
    isSelectValueChanged2,
  ]);

  return (
    <div>
      <div className="mb-8">
        <p className="text-[#606060] font-semibold text-lg">
          Turn on Automatic No Show Detection
        </p>
        <p className="text-[#A2A3A7] text-sm font-semibold">
          Give Grunt the permissions to detect no shows.
        </p>
      </div>
      <div className="space-y-7 mb-5">
        {features.map((feature, index) => (
          <div className="flex items-center gap-5 justify-between" key={index}>
            <div className="flex items-center gap-5">
              <div className="w-5 h-5 flex items-center justify-center">
                {typeof feature.icon === "string" ? (
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
                    : index === 1 || index === 2
                    ? index === 1
                      ? isChecked1
                      : isChecked2
                    : index === 3
                    ? isSelectValueChanged1
                    : isSelectValueChanged2,
                  index === 0
                    ? setIsConnected
                    : index === 1
                    ? setIsChecked1
                    : index === 2
                    ? setIsChecked2
                    : index === 3
                    ? setIsSelectValueChanged1
                    : setIsSelectValueChanged2
                )
              : feature.component}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoShow;
