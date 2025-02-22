import FilterUi from "@/components/FilterUi";
import HeaderSec from "@/components/HeaderSec";
import React from "react";
import MyCalendar from "./Calender/MyCalender";
import Products from "./Products";
const statsData = [
  {
    title: "Gross Sales",
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
        title="You’ve made $11,000 net profit this month"
        cards={statsData}
      />
      <Products />
      {/* <MyCalendar /> */}
    </div>
  );
}

export default Overview;
