import Image from "next/image";
import React from "react";
import { Card } from "./ui/card";
import { Ellipsis } from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-[350px] h-screen fixed left-0 top-0 hidden lg:block bg-[#F7F7F7]">
      {/* logo */}
      <div className="h-16 flex items-center bg-white mb-5 border-b border-black">

      </div>
      <div className="px-5 space-y-5">
        <span className="border rounded-lg px-3 py-1.5 text-[#7D7D7D] text-xs font-semibold flex items-center gap-2 w-fit bg-white">
          <Image
            src={"/assets/images/flag.png"}
            width={20}
            height={20}
            alt="flag image"
          />
          AGENT INSTRUCTIONS
        </span>
        <Card className="w-full p-5 shadow-none relative">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/images/green-card.png"
              alt="green card"
              width={45}
              height={45}
            />
            <div>
              <p className=" font-semibold">First Confirmation</p>
              <p className="text-xs font-bold text-slate-400">
                Confirm 1 week before appointment
              </p>
            </div>
          </div>
          <CardSettings />
        </Card>

        <Card className="w-full p-5 shadow-none relative">
          <div className="flex items-center gap-3 mb-5">
            <Image
              src="/assets/images/purple-card.png"
              alt="green card"
              width={45}
              height={45}
            />
            <div>
              <p className=" font-semibold">Second Confirmation</p>
              <p className="text-xs font-bold text-slate-400">
                Confirm at 9 PM on appointment day
              </p>
            </div>
          </div>
          <hr className="mb-5" />
          <div>
            <p className="text-lg font-semibold mb-1 text-[#8897A0]">
              Monitor user engagement
            </p>
            <p className="text-md text-slate-400 flex gap-2 items-center">
              Call and text until
              <span className="bg-[#E9F7F7] px-3 py-1 text-sm rounded-md">
                10:00 AM
              </span>
            </p>
          </div>
          <CardSettings />
        </Card>

        <Card className="w-full p-5 shadow-none relative">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/images/blue-card.png"
              alt="green card"
              width={45}
              height={45}
            />
            <div>
              <p className=" font-semibold">If no engagement</p>
              <p className="text-xs font-bold text-slate-400">
                Call customer at 9 AM on the day of
              </p>
            </div>
          </div>
          <CardSettings />
        </Card>
      </div>
    </aside>
  );
}

function CardSettings() {
  return (
    <div className="w-5 h-5 flex items-center justify-center bg-[#F7F7F7] absolute top-3 right-3 rounded-md cursor-pointer">
      <Ellipsis className="w-4 h-4" />
    </div>
  );
}
export default Sidebar;
