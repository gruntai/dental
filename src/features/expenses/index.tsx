"use client";
import HeaderSec from "@/components/HeaderSec";
import React, { useEffect } from "react";
import ExpensesTable from "./ExpensesTable";
const statsData = [
  {
    title: "Expenses This Week",
    stat: "$4,200",
  },
  {
    title: "Expenses This Month",
    stat: "$18,340",
  },
  {
    title: "Net Profit / Loss This Month",
    stat: "$12,120",
  },
  {
    title: "Margins",
    stat: "30%",
  },
];

function ExpensesFeat() {
  useEffect(() => {
    document.querySelector(".main")?.classList.add("!bg-white");
    return () => document.querySelector(".main")?.classList.remove("!bg-white");
  }, []);

  return (
    <div>
      <HeaderSec
        title="You’ve spent $18,340 so far this month"
        cards={statsData}
      />
      <ExpensesTable />
    </div>
  );
}

export default ExpensesFeat;
