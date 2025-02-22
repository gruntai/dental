import FilterUi from "@/components/FilterUi";
import HeaderSec from "@/components/HeaderSec";
import React from "react";
import MyCalendar from "./Calender/MyCalender";
import Products from "./Products";
const statsData = [
  {
    title: "Revenue Recovered",
    stat: "$30,000",
  },
  {
    title: "Expenses",
    stat: "$18,340",
  },
  {
    title: "Orders Pending Delivery",
    stat: "220",
  },
  {
    title: "New Customers",
    stat: "60",
  },
];

function Overview() {
  return (
    <div className="space-y-10 pb-20">
      <HeaderSec
        title="Grunt helped recover $30,000 this month"
        cards={statsData}
      />
      <Products />
      {/* <MyCalendar /> */}
    </div>
  );
}

export default Overview;
