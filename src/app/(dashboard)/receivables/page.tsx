import React from "react";
import RecTable from "@/features/receivables/recTable";
import HeaderSec from "@/components/HeaderSec";

const statsData = [
  {
    title: "Total Pending",
    stat: "$14,200",
  },
  {
    title: "Total Overdue",
    stat: "$4,340",
  },
];
function receivables() {
  return (
    <>
      <HeaderSec
        title="You have $18,340 in outstanding receivables "
        cards={statsData}
      />
      <RecTable />
    </>
  );
}

export default receivables;
