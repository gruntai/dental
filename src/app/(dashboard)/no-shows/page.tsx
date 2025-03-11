import HeaderSec from "@/components/HeaderSec";
import MyCalendar from "@/features/overview/Calender/MyCalender";
import React from "react";

const statsData = [
  {
    title: "Revenue Recovered",
    stat: "$30,000",
  },
  {
    title: "No Shows Avoided",
    stat: "60",
  },
  {
    title: "Gaps Filled",
    stat: "220",
  },
  {
    title: "Reminders Initiated",
    stat: "60",
  },
];

function NoShows() {
  return (
    <div className="space-y-10 pb-20">
      <HeaderSec
        title="This month we filled 60 no shows gaps."
        cards={statsData}
      />
      <MyCalendar hasNoShows={true} />
    </div>
  );
}

export default NoShows;
