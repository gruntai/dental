import Image from "next/image";
import { Card } from "./ui/card";
import { Ellipsis } from "lucide-react";

import { useState } from "react";
import { Input } from "./ui/input";

export const ReusableCard = ({
  imageSrc,
  alt,
  title,
  description,
  children,
}: any) => {
  // State to track whether the input is visible
  const [isInputVisible, setInputVisible] = useState(false);
  // State to store the submitted value
  const [submittedValue, setSubmittedValue] = useState("");

  // Handle toggling the input visibility
  const handleToggleInput = () => setInputVisible(!isInputVisible);

  // Handle submitting the value
  const handleSubmit = () => {
    if (submittedValue.trim()) {
      setSubmittedValue(submittedValue);
      setInputVisible(false); // Hide the input after submission
    }
  };

  return (
    <Card className="w-full p-5 shadow-none relative">
      <div className="flex items-center gap-3">
        <Image src={imageSrc} alt={alt} width={45} height={45} />
        <div className=" break-all hyphens-auto">
          <p className="font-semibold">{title}</p>
          <p className="text-xs font-bold text-slate-400 flex hyphens-auto w-full">
            {isInputVisible ? (
              <div className="flex items-end gap-2">
                <Input
                  type="text"
                  value={submittedValue}
                  onChange={(e) => setSubmittedValue(e.target.value)}
                  onBlur={handleSubmit}
                  placeholder="Enter value"
                  className="border-0 border-b py-0 pb-1 h-auto font-light pl-0 !outline-none text-sm w-full mt-0"
                />
                {/* <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white text-[5px] w-4 h-4 flex items-center justify-center rounded"
                >
                  --&gt;
                </button> */}
              </div>
            ) : submittedValue ? (
              submittedValue
            ) : (
              description
            )}
          </p>
        </div>
      </div>

      {children && <div className="mt-5">{children}</div>}
      <CardSettings onClick={handleToggleInput} />
    </Card>
  );
};

function CardSettings({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-5 h-5 flex items-center justify-center bg-[#F7F7F7] absolute top-3 right-3 rounded-md cursor-pointer">
      <Ellipsis className="w-4 h-4" onClick={onClick} />
    </div>
  );
}

export const cardData = [
  {
    imageSrc: "/assets/images/green-card.png",
    alt: "green card",
    title: "First Confirmation",
    description: "Confirm 1 week before appointment",
    children: null, // No additional content
  },
  {
    imageSrc: "/assets/images/purple-card.png",
    alt: "purple card",
    title: "Second Confirmation",
    description: "Confirm at 9 PM on appointment day",
    children: (
      <>
        <hr className="mb-5 -mx-5" />
        <div>
          <p className="text-lg font-semibold mb-1 text-[#8897A0]">
            --&gt; If no confirmation
          </p>
          <p className="text-md text-slate-400 flex gap-2 items-center">
            Call and text until
            <Time time="10:00 AM" />
          </p>
        </div>
      </>
    ),
  },
  {
    imageSrc: "/assets/images/blue-card.png",
    alt: "blue card",
    title: "If no engagement",
    description: "Call customer at 9 AM on the day of",
    children: null, // No additional content
  },
];

function Time({ time }: { time: string }) {
  const [isInputVisible, setInputVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(time);

  const handleBlur = () => {
    setInputVisible(false);
  };

  const handleToggleInput = () => {
    console.log("clicked");

    setInputVisible(true);
  };

  return (
    <span
      className={`bg-[#E9F7F7] px-2 py-1 text-sm rounded-md font-semibold block w-[88px] text-center`}
    >
      {isInputVisible ? (
        <Input
          type="text"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={handleBlur}
          placeholder="Enter value"
          className="border-0 border-b py-0 h-auto font-light pl-0 !outline-none text-sm w-full bg-transparent mt-0"
        />
      ) : (
        <span onClick={handleToggleInput} className="cursor-pointer">
          {currentValue}
        </span>
      )}
    </span>
  );
}
