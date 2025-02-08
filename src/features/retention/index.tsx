import FilterUi from "@/components/FilterUi";
import HeaderSec from "@/components/HeaderSec";
import { title } from "process";
import React from "react";
import { PatientsTable } from "./PatientsTable";
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

const filterCards = [
  {
    title: "Show Everything",
  },
  {
    title: "Unscheduled",
  },
  {
    title: "Last Minute Cancellations",
  },
  {
    title: "Scheduled Recalls",
  },
  {
    title: "Good Standing",
  },
];

function PatientRetention() {
  return (
    <div className="space-y-10 pb-20">
      <HeaderSec title="Patient Retention Summary" cards={statsData} />
      <FilterUi title="Filter Patients By" cards={filterCards} />
      <PatientsTable />
    </div>
  );
}

export default PatientRetention;
