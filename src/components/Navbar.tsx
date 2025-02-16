"use client";
import React from "react";
import { Bell, Mail, MenuIcon, Search } from "lucide-react";
import { Switch } from "./ui/switch";
import Image from "next/image";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { NavigationList } from "./Sidebar";
import Link from "next/link";

function Navbar() {
  const [checked, setChecked] = React.useState(true);
  return (
    <nav className="bg-white fixed left-0 top-0 z-50 w-full flex items-center justify-between px-5 lg:px-10 py-3 pt-5 border-b border-black">
      <div className="flex gap-20 items-center">
        <Image
          src="/assets/images/logos/grunt_logo.png"
          alt="grunt logo"
          width={120}
          height={30}
          // className="pl-5"
        />
        <div className="border border-[#E4E4E7] pl-7 relative rounded-3xl overflow-hidden w-[384px] max-w-sm hidden lg:block">
          <Input
            type="search"
            placeholder="Search for what you need..."
            className="outline-0 border-0"
          />
          <Search className="absolute left-3 top-2.5" size={16} />
        </div>
      </div>
      <div className="flex items-start md:items-center gap-4 md:justify-end">
        <div className="flex flex-wrap gap-5 items-center">
          <div className=" border-[#C5D0D3] border-[1.5px] rounded-lg h-[38px] px-2.5  flex items-center gap-2">
            <Switch
              className="h-5 w-9 data-[state=checked]:bg-green-600"
              thumbClasses="w-4 h-4 data-[state=checked]:translate-x-4"
              // checked={true}
              checked={checked}
              onCheckedChange={setChecked}
            />
            <span className="text-[#818993]">Enabled</span>
          </div>

          <Mail
            className="w-[18px] h-[18px] ml-3 cursor-pointer hidden lg:block"
            strokeWidth={2}
          />
          <Bell
            className="w-[18px] h-[18px] cursor-pointer hidden lg:block"
            strokeWidth={2}
          />
          <Sheet>
            <SheetTrigger className="block lg:hidden ">
              <MenuIcon size={24} />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader className="h-full">
                <Image
                  src="/assets/images/logos/grunt_logo.png"
                  alt="grunt logo"
                  width={120}
                  height={30}
                  className="mb-10"
                />
                <div className="flex flex-col h-full">
                  <div className="flex-1 h-full">
                    <NavigationList />
                  </div>
                  <Link
                    href={"/account-settings"}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="w-11 h-11  bg-[#E8D7FE] rounded-full flex items-center justify-center text-white">
                      SL
                    </div>
                    <span className="text-[#737278] text-sm font-semibold">
                      Account Settings
                    </span>
                  </Link>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
