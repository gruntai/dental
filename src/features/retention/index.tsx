import FilterUi from "@/components/FilterUi";
import HeaderSec from "@/components/HeaderSec";
import { title } from "process";
import React from "react";
import PatientRetentionTable from "./PatientsTable";
import { AlertTriangle, CheckCircle, Users } from "lucide-react";
import Image from "next/image";
const statsData = [
  {
    title: "Revenue Recovered",
    stat: "$30,000",
  },
  {
    title: "New Patients Converted",
    stat: "60",
  },
  {
    title: "Patients Retained",
    stat: "220",
  },
  {
    title: "No Shows Avoided",
    stat: "60",
  },
];

// const filterCards = [
//   {
//     title: "Show Everything",
//   },
//   {
//     title: "Potential No Shows",
//   },
//   {
//     title: "Unscheduled Treatments",
//   },
//   {
//     title: "Scheduled Recalls",
//   },
//   {
//     title: "New Patient Lead",
//   },
// ];

function PatientRetention() {
  return (
    <div className="space-y-7 pb-20">
      {/* <HeaderSec title="Patient Retention Summary" cards={statsData} />
      <FilterUi title="Filter Patients By" cards={filterCards} /> */}
      {/* Header */}
      <div>
        <h1 className="text-xl font-normal text-[#111827] tracking-tight">
          Patient Retention List
        </h1>
        <p className="text-xs text-[#4B5563]">
          Manage patient follow-ups and interactions
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          icon={"/user-pending.svg"}
          title="Pending Follow-ups"
          count={24}
        />
        <Card icon={"/check.svg"} title="Completed Today" count={12} />
        <Card icon={"/warning.svg"} title="Overdue" count={8} />
      </div>
      <PatientRetentionTable />
    </div>
  );
}
const Card = ({
  icon,
  title,
  count,
}: {
  icon: string;
  title: string;
  count: number;
}) => {
  return (
    <div className="rounded-lg border border-t-0 border-[#E5E7EB] shadow-sm bg-card p-3">
      <div className="flex items-center gap-2">
        <Image
          src={`/assets/images/icons/${icon}`}
          width={20}
          height={20}
          alt="icon"
        />{" "}
        <div className="flex flex-col">
          <span className="text-xs font-normal  text-[#4B5563]">{title}</span>
          <span className="text-xl text-[#111827] font-normal">{count}</span>
        </div>
      </div>
    </div>
  );
};
export default PatientRetention;
