"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Bell,
  Link,
  Mail,
  Menu,
  PlayCircle,
  Search,
  Trash2,
} from "lucide-react";
import { Switch } from "./ui/switch";
import Image from "next/image";
import { Input } from "./ui/input";

function Navbar() {
  const [checked, setChecked] = React.useState(true);
  return (
    <nav className="bg-white fixed left-0 top-0 z-50 w-full flex items-center justify-between px-10 py-3 pt-5 border-b border-black">
      <div className="flex gap-20 items-center">
        <Image
          src="/assets/images/logos/grunt_logo.png"
          alt="grunt logo"
          width={120}
          height={30}
          // className="pl-5"
        />
        <div className="border border-[#E4E4E7] pl-7 relative rounded-3xl overflow-hidden w-[384px] max-w-sm">
          <Input
            type="search"
            placeholder="Search for what you need..."
            className="outline-0 border-0"
          />
          <Search className="absolute left-3 top-2.5" size={16}   />
        </div>
      </div>
      <div className="flex items-start md:items-center gap-4 md:justify-end">
        <div className="flex flex-wrap gap-5 items-center">
          <div className=" border-[#C5D0D3] border-[1.5px] rounded-lg h-[38px] px-2.5  flex items-center gap-2">
            <Switch
              className="h-5 w-9 data-[state=checked]:bg-green-600"
              thumbClassName="w-4 h-4 data-[state=checked]:translate-x-4"
              // checked={true}
              checked={checked}
              onCheckedChange={setChecked}
            />
            <span className="text-[#818993]">Enabled</span>
          </div>

          <Mail
            className="w-[18px] h-[18px] ml-3 cursor-pointer"
            strokeWidth={2}
          />
          <Bell className="w-[18px] h-[18px] cursor-pointer" strokeWidth={2} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
