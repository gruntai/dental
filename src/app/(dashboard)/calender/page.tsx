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
import { ReactNode } from "react";

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
  data: {
    node?: (data: any) => ReactNode;
  };
};

// Example events
const events: MyEvent[] = [
  {
    start: moment("2025-01-13T10:00:00").toDate(),
    end: moment("2025-01-13T11:30:00").toDate(),
    title: "Event 1",
    data: {
      node: (data: any) => (
        <div className="border-2 border-[#FF5733] rounded-md px-2 py-3 h-full bg-[#ffe6e6]">
          <span className="bg-[#FF5733] text-white rounded-md px-2 py-1 text-xs mb-3 block">
            ONGOING
          </span>
          <p className="text-black text-xs xl:text-base mb-2">
            {moment(data.start).hour()} AM Nejat Murad
          </p>
          <Image
            src="/assets/images/avatar.png"
            width={30}
            height={30}
            alt="avatar image"
            className="rounded-lg"
          />
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-14T12:00:00").toDate(),
    end: moment("2025-01-14T13:30:00").toDate(),
    title: "Event 2",
    data: {
      node: (data: any) => (
        <div className="border-2 border-[#3498db] rounded-md px-2 py-3 h-full bg-[#e1f5fe]">
          <span className="bg-[#3498db] text-white rounded-md px-2 py-1 text-xs mb-3 block">
            UPCOMING
          </span>
          <p className="text-black text-xs xl:text-base mb-2">
            {moment(data.start).hour()} PM John Doe
          </p>
          <Image
            src="/assets/images/avatar.png"
            width={30}
            height={30}
            alt="avatar image"
            className="rounded-lg"
          />
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-15T14:00:00").toDate(),
    end: moment("2025-01-15T15:30:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-2 border-[#2ecc71] rounded-md px-2 py-3 h-full bg-[#d1f8e3]">
          <span className="bg-[#2ecc71] text-white rounded-md px-2 py-1 text-xs mb-3 block">
            COMPLETED
          </span>
          <p className="text-black text-xs xl:text-base mb-2">
            {moment(data.start).hour()} PM Alice Smith
          </p>
          <Image
            src="/assets/images/avatar.png"
            width={30}
            height={30}
            alt="avatar image"
            className="rounded-lg"
          />
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-16T09:30:00").toDate(),
    end: moment("2025-01-16T11:00:00").toDate(),
    title: "Event 4",
    data: {
      node: (data: any) => (
        <div className="border-2 border-[#f39c12] rounded-md px-2 py-3 h-full bg-[#fef3c7]">
          <span className="bg-[#f39c12] text-white rounded-md px-2 py-1 text-xs mb-3 block">
            PENDING
          </span>
          <p className="text-black text-xs xl:text-base mb-2">
            {moment(data.start).hour()} AM Bob Johnson
          </p>
          <Image
            src="/assets/images/avatar.png"
            width={30}
            height={30}
            alt="avatar image"
            className="rounded-lg"
          />
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-17T15:00:00").toDate(),
    end: moment("2025-01-17T16:30:00").toDate(),
    title: "Event 5",
    data: {
      node: (data: any) => (
        <div className="border-2 border-[#8e44ad] rounded-md px-2 py-3 h-full bg-[#f2e6f9]">
          <span className="bg-[#8e44ad] text-white rounded-md px-2 py-1 text-xs mb-3 block">
            CANCELED
          </span>
          <p className="text-black text-xs xl:text-base mb-2">
            {moment(data.start).hour()} PM Sarah Lee
          </p>
          <Image
            src="/assets/images/avatar.png"
            width={30}
            height={30}
            alt="avatar image"
            className="rounded-lg"
          />
        </div>
      ),
    },
  },
];

const components: Components<MyEvent, object> = {
  event: ({ event }) => {
    return <>{event?.data?.node({ event })}</>;
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
