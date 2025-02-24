"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ActionDialog } from "./ActionDialog";

const filterOptions = [
  {
    id: 1,
    label: "Show All",
    value: "showAll",
  },
  {
    id: 2,
    label: "Critical",
    value: "critical",
  },
  {
    id: 3,
    label: "Recommended",
    value: "recommended",
  },
  {
    id: 4,
    label: "Warnings",
    value: "warning",
  },
];

const notifications = [
  {
    title: "$7,320 in Unpaid Customer Invoices",
    description:
      "18 customers have overdue invoices, delaying cash flow. Suggested Action: Send automated payment reminders or offer small early payment discounts.",
    status: "Critical",
    image: {
      src: "customer-management.png",
      alt: "Image 3",
      width: 30,
      height: 30,
    },
    actionType: "takeAction",
  },
  {
    title: "Utility Bills Increased by 14% ($870 Higher)",
    description:
      "This month's water and electricity costs jumped from $6,230 to $7,100. Suggested Action: Reduce machine idle time and optimize load distribution.",
    status: "Warning",
    image: {
      src: "inventory.png",
      alt: "Image 2",
      width: 30,
      height: 30,
    },
    actionType: "takeAction",
  },
  {
    title: "Supply Costs Up by 9% ($1,450 Higher)",
    description:
      "Last month: $16,120 → This month: $17,570. Key increases: Detergent: +$600 Solvents: +$450 Suggested Action: Reevaluate supplier contracts and consider bulk ordering.",
    status: "Critical",
    image: {
      src: "book.png",
      alt: "Image 1",
      width: 30,
      height: 30,
    },
    actionType: "noShow",
  },
  {
    title: "Potential Profitbility Impact",
    description:
      "Profitability Impact: If supply costs keep increasing, profit margins may shrink by 8-10% in the next quarter.",
    status: "Critical",
    image: {
      src: "missed-call.png",
      alt: "Image",
      width: 30,
      height: 30,
    },
    actionType: "missed",
  },
];

function RecourcesTable() {
  const [currentStatus, setCurrentStatus] = React.useState("showAll");
  const filteredNotifications =
    currentStatus == "showAll"
      ? notifications
      : notifications.filter((n) => n.status.toLowerCase() == currentStatus);

  return (
    <div className="border border-black rounded-[10px] py-2">
      <div className="px-5 md:px-7 flex items-center sm:items-end gap-7 font-semibold pb-2 border-b border-black">
        <span className="text-[#7E7E7F] text-lg">Filter Severity:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="block sm:hidden">
              <span className="sr-only">Open menu</span>
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {filterOptions.map((option) => (
              <DropdownMenuItem>{option.label}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="gap-10 items-center hidden sm:flex">
          {filterOptions.map((option) => {
            return (
              <span
                key={option.id}
                style={{ color: getStatusColor(option.value) }}
                onClick={() => setCurrentStatus(option.value)}
                className={cn("cursor-pointer", {
                  "underline underline-offset-4": currentStatus == option.value,
                })}
              >
                {option.label}
              </span>
            );
          })}
        </div>
      </div>
      <div className="px-5 md:px-7 py-5">
        {filteredNotifications.map((n, idx) => {
          return (
            <div className="row flex flex-col sm:flex-row gap-3 sm:gap-10 sm:items-center mb-10 sm:mb-5 last:mb-0">
              <div className="flex flex-1 items-center gap-6">
                <div className="w-6 h-6 flex-shrink-0 hidden sm:block">
                  <Image
                    src={`/assets/images/resources/${n.image.src}`}
                    width={n.image.width}
                    height={n.image.height}
                    alt={n.image.alt}
                    className="mx-auto"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-lg">{n.title}</p>
                    <p
                      className="text-white text-sm px-2 py-0.5 rounded-sm"
                      style={{
                        backgroundColor: getStatusColor(n.status.toLowerCase()),
                      }}
                    >
                      {n.status}
                    </p>
                  </div>
                  <p className="text-[#858686]">{n.description}</p>
                </div>
              </div>
              <ActionDialog
                buttonLabel={
                  n.status.toLowerCase() == "warning"
                    ? "See Details"
                    : "Take Action"
                }
                actionType={n.actionType}
                buttonClasses={cn(
                  `bg-[#28A745] hover:bg-[#28A745]/80 h-8 px-2 text-sm font-semibold`,
                  {
                    "text-[#858686] bg-white hover:bg-white border-black border":
                      n.status.toLowerCase() == "warning",
                  }
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecourcesTable;

function getStatusColor(status: string) {
  switch (status) {
    case "showAll":
      return "black";
    case "critical":
      return "#D32F2F";
    case "recommended":
      return "#2E7D32";
    case "warning":
      return "#FF9800";
  }
}
