"use client";
import {
  Calendar,
  Components,
  momentLocalizer,
  View,
} from "react-big-calendar";
import moment from "moment";
import "moment-timezone"; // or 'moment-timezone/builds/moment-timezone-with-data[-datarange].js'. See their docs
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock4 } from "lucide-react";
import { cn } from "@/lib/utils";

// Set the IANA time zone you want to use
moment.tz.setDefault("Europe/Paris");

// Setup the localizer by providing the moment Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

// Define the event type
type MyEvent = {
  start: Date;
  end: Date;
  title: string;
};

// Example events
const events: MyEvent[] = [
  {
    start: moment("2025-01-13T10:00:00").toDate(),
    end: moment("2025-01-13T11:30:00").toDate(),
    title: "Event 1",
  },
];

const components: Components<MyEvent, object> = {
  event: ({ event }) => {
    const hour = moment(event.start).hour();
    return (
      <div className="border-2 border-[#FFCB33] rounded-md px-2 py-3 h-full bg-[#fffcf5]">
        <span className="bg-[#FFCB33] text-white rounded-md px-2 py-1 text-xs mb-3 block">
          ONGOING
        </span>
        <p className="text-black text-xs xl:text-base mb-2">
          {hour} AM Nejat Murad
        </p>
        <Image
          src="/assets/images/avatar.png"
          width={30}
          height={30}
          alt="avatar image"
          className="rounded-lg"
        />
      </div>
    );
  },
  toolbar: ({ onNavigate, label, onView, view }) => {
    return (
      <div className="flex justify-between mb-10">
        <Button
          variant={"outline"}
          className="w-fit rounded-3xl"
          onClick={() => onNavigate("TODAY")}
        >
          Today
        </Button>
        <div className="gap-5 flex items-center">
          <Button
            variant={"outline"}
            className="w-10 h-10 rounded-full"
            onClick={() => onNavigate("PREV")}
          >
            <ChevronLeft />
          </Button>
          <span className="rbc-toolbar-label">{label}</span>

          <Button
            variant={"outline"}
            className="w-10 h-10 rounded-full"
            onClick={() => onNavigate("NEXT")}
          >
            <ChevronRight />
          </Button>
        </div>

        <div className="border rounded-3xl overflow-hidden">
          {["Month", "Week", "Day"].map((type) => (
            <Button
              variant={"outline"}
              key={type}
              onClick={() => onView(type.toLowerCase() as View)}
              className={cn(
                "border-0 border-l rounded-none text-slate-400 font-semibold",
                {
                  "text-black": view === type.toLowerCase(),
                }
              )}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
    );
  },
  timeGutterHeader: () => {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Clock4 className="w-6 h-6 opacity-30" />
      </div>
    );
  },
  // timeSlotWrapper: (props: { value: string }) => {
  //   const value = props.value;
  //   return <span> {moment(value).hour()}</span>;
  // },
};

const MyCalendar = () => (
  <div className="myCustomHeight w-full px-5 pb-10">
    <Calendar<MyEvent>
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100vh" }}
      className="w-full overflow-x-auto"
      defaultView="week"
      components={components}
    />
  </div>
);

export default MyCalendar;
