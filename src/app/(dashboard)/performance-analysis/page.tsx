import HeaderSec from "@/components/HeaderSec";
import RecourcesTable from "@/features/performance-analysis/Table";
import React from "react";

const statsData = [
  {
    title: "Reduction In Overspending",
    stat: "$7,680",
  },
  {
    title: "Reduction In Waste",
    stat: "$9,270",
  },
  {
    title: "Current Supply Level",
    stat: "80%",
  },
  {
    title: "Previous Month Savings",
    stat: "$4,300",
  },
];

function PerformancePage() {
  return (
    <div className="space-y-10 pb-20">
      <HeaderSec
        title="Grunt helped you saved $16,950 this month"
        cards={statsData}
      />
      <RecourcesTable />
    </div>
  );
}

export default PerformancePage;
