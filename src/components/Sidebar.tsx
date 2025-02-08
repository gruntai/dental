import React from "react";

import { cn } from "@/lib/utils";

import { Clock } from "lucide-react";
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
        "w-64 h-screen fixed left-0 top-24 mt-1  hidden z-40 lg:block bg-white slide-out-to-left-[300px] duration-500 pl-7 pr-5",
        {
          "-translate-x-[290px]": isOpened,
          // "slide-out-to-left-[300px]": isOpened,
        }
      )}
    >
      <NavigationList />
    </aside>
  );
}

const menuItems = [
  {
    icon: "Image-3.svg",
    label: "Overview",
    link: "/overview",
    width: 14,
    height: 16,
  },
  {
    icon: "Image-2.svg",
    label: "View Calendar",
    link: "/calendar",
    width: 16,
    height: 16,
  },
  {
    icon: "Image-1.svg",
    label: "Potential No Shows",
    link: "/no-shows",
    width: 16,
    height: 16,
  },
  {
    icon: "Image.svg",
    label: "Patient Retention",
    link: "/patient-retention",
    width: 18,
    height: 16,
  },
  {
    icon: "$.svg",
    label: "New Patient Leads",
    link: "/leads",
    width: 11,
    height: 19,
  },
  {
    icon: <Clock className="w-4 h-4" />,
    label: "My Patient Waitlist",
    link: "/waitlist",
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
            <span className={"font-bold text-sm text-[#737278]"}>{item.label}</span>
          </Link>
        );
      })}
    </ul>
  );
}

export default Sidebar;
