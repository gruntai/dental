import "./customslot.css";
import moment from "moment";
import React from "react";

function TimeSlot(props, step, day, isRender) {
  const differenceMs = +moment() - +moment(props.value);
  const isCurrentTimeSlot =
    differenceMs / (60 * 1000) > 0 && differenceMs / (60 * 1000) < step;
  console.log(isCurrentTimeSlot, differenceMs);

  let timeIndicator = {};
  let addStyle = {};

  //   if (isCurrentTimeSlot && isRender) {
  //     timeIndicator.children = <div className="w-full h-10 bg-black"></div>;
  //     addStyle = { zIndex: "inherit" };
  //   }

  return React.cloneElement(props.children, {
    style: { ...addStyle },
    "data-time": moment(props.value).format("HH:mm"),
    ...timeIndicator,
  });
}

export default TimeSlot;
