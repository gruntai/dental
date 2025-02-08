import Image from "next/image";
import React, { useState, useEffect } from "react";
import zap from "@/assets/icons/zap.svg";
import greenCheck from "@/assets/icons/green-check.png";
import moment from "moment";
import {
  ArrowRightLeft,
  ChevronDown,
  ChevronRight,
  CirclePlay,
  EllipsisVertical,
  PlusCircle,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

function PotentialToShow({ data }: { data: any }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [showSecondBox, setShowSecondBox] = useState(false);
  const [showThirdBox, setShowThirdBox] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(3); // Countdown starts from 10 minutes (600 seconds)

  const handleShowWorkflow = () => {
    setShowWorkflow(true);

    let intervalID: NodeJS.Timeout;
    intervalID = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setShowSecondBox(true);
          clearInterval(intervalID); // Stop the timer when it reaches 0
          return 0; // Ensure timeLeft doesn't go below 0
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (showSecondBox) setTimeout(() => setShowThirdBox(true), 3000);
  }, [showSecondBox]);

  useEffect(() => {
    if (showThirdBox)
      setTimeout(() => {
        setShowWorkflow(false);
        setIsConfirmed(true);
      }, 3000);
  }, [showThirdBox]);

  // Countdown logic
  // useEffect(() => {
  //   if (timeLeft > 0) {
  //     const timer = setInterval(() => {
  //       setTimeLeft((prevTime) => prevTime - 1);
  //     }, 1000);

  //     return () => clearInterval(timer); // Cleanup interval
  //   }
  // }, [timeLeft]);

  // Format timeLeft into MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };
  console.log("workflow is goning on...", showWorkflow);
  console.log("workflow is confirmed?", isConfirmed);

  return (
    <div
      className="relative flex h-full w-full z-20"
      onClick={handleShowWorkflow}
    >
      <div
        className={cn(
          "animate border-[3px] border-[#ff6733] rounded-md px-2 py-3 w-full bg-[#fff7f5]",
          {
            "border-[#29CC39]": isConfirmed,
            " animate-pulse-ongoing": !showWorkflow && !isConfirmed,
          }
        )}
      >
        {!isConfirmed && (
          <>
            <div className="flex gap-2 mb-3">
              <span
                className={
                  "bg-[#ff6733] text-white rounded-lg h-8 w-8 flex items-center justify-center text-xs"
                }
              >
                <Image src={zap} alt="zap icon" width={13} height={13} />
              </span>
              <span className="bg-[#ff6733] text-white rounded-lg px-2 flex items-center text-xs font-semibold">
                POTENTIAL NO SHOW
              </span>
            </div>
            <p
              className={cn(
                "text-[#4D5E80] text-xs xl:text-base mb-2 font-bold"
              )}
            >
              {moment(data.event.start).format("h:mm a")} Sara Khan
            </p>
            <p className="bg-white p-2 rounded-lg border border-dashed border-[#ADB5BD] text-[10px] text-[#1C1F23]">
              Contact customer via call and text until 10 AM --&gt;If no
              response offer spot to other customers
            </p>{" "}
          </>
        )}

        {isConfirmed && (
          <>
            <div className="flex gap-2 mb-3">
              <span className="bg-[#29CC39] text-white rounded-lg p-2 flex items-center text-xs font-semibold">
                Confirmed 2 Hours Ago
              </span>
            </div>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
              {moment(data.event.start).format("h:mm a")} Sara Khan
            </p>
            <div className="bg-[#33BFFF] text-white rounded-md p-2 flex items-center text-[8px] font-semibold w-fit mb-2">
              ADDED FROM WAITLIST{" "}
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white rounded-md w-5 h-5 p-1.5 flex items-center justify-center">
                <ArrowRightLeft className="text-black/50" />
              </span>
              <span className="text-[10px] text-[#29CC39]">
                Swap Sarah Khan With Nadia J
              </span>
            </div>
          </>
        )}
      </div>

      {/* First Box */}
      <div
        className={cn(
          "absolute top-0 -right-80 rounded-lg bg-white border border-dashed border-blue-600 p-3 w-64 z-20 shadow-md opacity-0 pointer-events-none duration-300 delay-200",
          {
            "fade-in-100 opacity-100 pointer-events-auto":
              showWorkflow && !isConfirmed,
          }
        )}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#ff6733] rounded-lg h-6 w-6 flex items-center justify-center text-xs">
            <Image src={zap} alt="zap icon" width={13} height={13} />
          </span>
          <span className="text-sm font-semibold text-black">
            No Show Behaviour Detected
          </span>
        </div>
        <div className="bg-[#F1F3F5] h-px w-full my-2"></div>
        <div className="flex items-center gap-2">
          <p className="text-black text-[10px]">
            Contact customer via call and text until{" "}
          </p>
          <span className="text-[#FF3B30] font-bold">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Arrows from Second Box */}
        <div>
          {/* vertical line */}
          <div
            className={cn(
              "absolute top-full right-40 w-0.5 h-6 bg-black duration-300 delay-100 opacity-0 pointer-events-none",
              {
                "fade-in-100 opacity-100 pointer-events-auto": showSecondBox,
              }
            )}
          ></div>
          {/* horizontal line */}
          <div
            className={cn(
              "absolute top-[calc(100%+24px)] right-[114px] h-0.5 w-12 bg-black duration-300 delay-200 opacity-0 pointer-events-none",
              {
                "fade-in-100 opacity-100 pointer-events-auto": showSecondBox,
              }
            )}
          >
            {/* arrow */}
            <PlusCircle className="w-4 h-4 text-black absolute -right-[14px] -top-2" />
            <div className="absolute top-[7px] -right-[7px] w-0.5 h-4 bg-black">
              <ChevronDown
                width={20}
                height={20}
                className="text-black absolute -right-[9px] top-1"
              />
            </div>
          </div>
        </div>

        {/* Second Box */}
        <div
          className={cn(
            "absolute -bottom-[140px] -right-20 rounded-lg bg-white border border-dashed border-[#ADB5BD] shadow-md p-3 w-64 z-20  duration-300 delay-300  opacity-0 pointer-events-none",
            {
              "fade-in-100 opacity-100 pointer-events-auto": showSecondBox,
            }
          )}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#6D52E2] rounded-lg h-6 w-6 flex items-center justify-center text-xs">
              <CirclePlay width={11} height={11} />
            </span>
            <span className="text-sm font-semibold text-black">
              Begin Contacting Waitlist{" "}
            </span>
          </div>
          <div className="bg-[#F1F3F5] h-px w-full my-3"></div>
          <div className="flex items-center gap-2">
            <p className="text-black text-xs">
              Waiting for confirmation from waitlist...
            </p>
          </div>
          <EllipsisVertical
            className="w-4 h-4 absolute top-4 right-2 text-[#495057]"
            fill="black"
          />
          {/* third box */}
          <div
            className={cn(
              "absolute -bottom-32 left-1/2 -translate-x-1/2 rounded-lg bg-white border-[3px] border-[#33BFFF] p-3 w-52 z-20 duration-300 delay-200  opacity-0 pointer-events-none",
              {
                "fade-in-100 opacity-100 pointer-events-auto": showThirdBox,
              }
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <Image
                src={greenCheck}
                alt="green check"
                width={22}
                height={22}
              />
              <span className="text-[10px] font-semibold text-white rounded-md p-2 bg-[#33BFFF]">
                CONFIRMED 2 MINS AGO
              </span>
            </div>
            <div className="bg-[#F1F3F5] h-px w-full my-3"></div>
            <div className="flex items-center gap-2">
              <p className="text-black text-xs font-semibold">
                Nadia J confirmed this spot{" "}
              </p>
            </div>
          </div>
          <div
            className={cn(
              "absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-black duration-300  opacity-0 pointer-events-none",
              {
                "fade-in-100 opacity-100 pointer-events-auto": showThirdBox,
              }
            )}
          ></div>
        </div>
      </div>

      {/* Arrow */}
      <div
        className={cn("duration-300 opacity-0 pointer-events-none", {
          "fade-in-100 opacity-100 pointer-events-auto":
            showWorkflow && !isConfirmed,
        })}
      >
        <span className="w-2 h-2 rounded-full bg-black absolute top-5 right-2"></span>
        <div className="absolute top-[23px] -right-16 w-20 h-0.5 bg-black">
          <ChevronRight
            width={20}
            height={20}
            className="absolute -top-[9px] -right-[7px] text-black"
          />
        </div>
      </div>
    </div>
  );
}

export default PotentialToShow;
