import React from "react";

import { cn } from "@/lib/utils";

import { Clock, ShoppingCart, UserPlus, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Sidebar({
  isOpened,
  handleOpenState,
}: {
  isOpened: boolean;
  handleOpenState: (arg: boolean) => void;
}) {
  return (
    <aside
      className={cn(
        "w-72 h-[calc(100%-61px)] border-r border-r-black fixed left-0 top-[61px] pt-8 pb-5  hidden z-40 lg:block bg-white slide-out-to-left-[300px] duration-500 pl-7 pr-5",
        {
          "-translate-x-[290px]": isOpened,
          // "slide-out-to-left-[300px]": isOpened,
        }
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
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
    </aside>
  );
}
const menuItems = [
  {
    icon: "Image-3.svg", // Same icon as "Overview"
    label: "Overview",
    link: "/overview",
    width: 14,
    height: 16,
  },
  {
    icon: <ShoppingCart size={20} />, // Same icon as "View Calendar"
    label: "View Orders",
    link: "/view-orders",
    width: 16,
    height: 16,
  },
  {
    icon: <UserPlus size={20} />, // Same icon as "Potential No Shows"
    label: "Add Customer",
    link: "/add-customer",
    width: 16,
    height: 16,
  },
  {
    icon: <Users size={20} />, // Same icon as "Patient Retention"
    label: "View Customers",
    link: "/view-customers",
    width: 18,
    height: 16,
  },
  {
    icon: <Wallet size={20} />, // Same icon as "New Patient Leads"
    label: "My Accounting",
    link: "/my-accounting",
  },
  {
    icon: "$.svg", // Same icon as "My Patient Waitlist"
    label: "My Expenses",
    link: "/expenses",
    width: 11,
    height: 19,
  },
  {
    icon: "analysis.svg", // Same icon as "Performance Analysis"
    label: "Performance Analysis",
    link: "/performance-analysis",
    width: 18,
    height: 18,
  },
];
export function NavigationList() {
  const pathname = usePathname();

  return (
    <ul className="space-y-1">
      {menuItems.map((item, index) => {
        const isActive = pathname === item.link;
        return (
          <Link
            key={index}
            href={item.link}
            className={cn(
              `flex items-center gap-3 p-3 rounded-3xl text-gray-700 hover:bg-[#e9d7fe]/80 transition-colors duration-200`,
              {
                "bg-[#e9d7fe] ": isActive,
              }
            )}
          >
            <div className="w-[18px] flex justify-center">
              {typeof item.icon == "string" ? (
                <Image
                  src={`/assets/images/${item.icon}`}
                  alt="icon"
                  width={item.width}
                  height={item.height}
                />
              ) : (
                <span className="text-[#1c110f]">{item.icon}</span>
              )}
            </div>
            <span className={"font-bold text-sm text-[#737278]"}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </ul>
  );
}

export default Sidebar;
