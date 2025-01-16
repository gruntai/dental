"use client";
import React from "react";
import { Button } from "./ui/button";
import { Link, Menu, PlayCircle, Trash2 } from "lucide-react";
import { Switch } from "./ui/switch";
import Image from "next/image";

function Navbar() {
  const [checked, setChecked] = React.useState(true);
  return (
    <nav className="bg-white fixed left-0 top-0 z-50 w-full flex items-center justify-between px-5 py-3 pt-5 shadow-md shadow-black/5">
      <Image
        src="/assets/images/logos/grunt_logo.png"
        alt="grunt logo"
        width={120}
        height={30}
        className="pl-5"
      />
      <div className="flex  items-start md:items-center gap-4 px-5 md:justify-end">
        <div className="flex flex-wrap gap-5 items-center">
          <Button
            variant={"outline"}
            className="border rounded-[10px] flex items-center gap-2"
          >
            <PlayCircle className="text-[#6a31e1] w-5 h-5" />
            <span className="text-[#848995]">Run now </span>
          </Button>
          <div className=" border-[#C5D0D3] border-[1.5px] rounded-[10px] h-10 px-3  flex items-center gap-2">
            <Switch
              className="h-5 w-9 data-[state=checked]:bg-green-600"
              thumbClassName="w-4 h-4 data-[state=checked]:translate-x-4"
              // checked={true}
              checked={checked}
              onCheckedChange={setChecked}
            />
            <span className="text-[#818993]">Enabled</span>
          </div>

          <Button
            variant={"outline"}
            size={"icon"}
            className="border-slate-200 w-10 h-10"
          >
            <Link className="text-blue-400" strokeWidth={3} />
          </Button>
          {/* dividor */}
          <div className="w-[2.5px] h-6 bg-[#c1c7d1]"></div>
          <Button
            variant={"outline"}
            size={"icon"}
            className="border-red-400 w-10 h-10"
          >
            <Trash2 className="text-red-400" strokeWidth={3} />
          </Button>
          {/* <Image
            src={"/assets/images/trash.png"}
            width={40}
            height={40}
            alt="trash image"
            className="text-red-400"
          /> */}
          {/* dividor */}
          <div className="w-[2.5px] h-6 bg-[#c1c7d1]"></div>
          <Menu strokeWidth={2} width={28} height={28} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
