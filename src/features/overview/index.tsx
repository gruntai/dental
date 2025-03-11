import FilterUi from "@/components/FilterUi";
import HeaderSec from "@/components/HeaderSec";
import React from "react";
import MyCalendar from "./Calender/MyCalender";
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

function Overview() {
  return (
    <div className="space-y-10 pb-20">
      <HeaderSec
        title="Grunt helped recover $30,000 this month"
        cards={statsData}
      />
      <MyCalendar />
    </div>
  );
}

export default Overview;
