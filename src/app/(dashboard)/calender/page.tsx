"use client";
import {
  Calendar,
  Components,
  momentLocalizer,
  View,
  Views,
} from "react-big-calendar";
import moment from "moment";
import "moment-timezone"; // or 'moment-timezone/builds/moment-timezone-with-data[-datarange].js'. See their docs
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock4, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import PotentialToShow from "./potiential-to-show";
import TimeSlot from "./timeslot";

// Set the IANA time zone you want to use
moment.tz.setDefault("Europe/Paris");

// Setup the localizer by providing the moment Object
// to the correct localizer.

const localizer = momentLocalizer(moment); // or globalizeLocalizer
const today = new Date();
const workingHoursStart = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  10,
  0,
  0
); // 9 AM
const workingHoursEnd = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  19,
  0,
  0
); // 5 PM

// Define the event type
type MyEvent = {
  start: Date;
  end: Date;
  title: string;
  data: {
    node?: (data: any) => ReactNode;
  };
};

const customFormats = {
  dayFormat: (date: Date, culture?: string) => moment(date).format("ddd DD/MM"),
  timeGutterFormat: "HH",
  eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
  monthHeaderFormat: "MMMM YYYY",
  dayHeaderFormat: "dddd, MMMM D, YYYY",
};

// Example events
const events: MyEvent[] = [
  {
    start: moment("2025-01-12T09:00:00").toDate(),
    end: moment("2025-01-12T10:00:00").toDate(),
    title: "Event 1",
    data: {
      node: (data: any) => (
        <div className="relative flex h-full w-full">
          {/* <span className="animate-ping duration-1.5s absolute inline-flex h-full w-full rounded-full bg-[#fffcf5] opacity-50"></span>{" "} */}
          <div className="border-[3px] border-[#ffcb34] rounded-md px-2 py-3 w-full h-full bg-[#fffcf5]">
            <span className="bg-[#ffcb34] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              ONGOING
            </span>
            <p className="text-black text-xs xl:text-base mb-2 font-bold">
              {moment(data.event.start).format("h:mm a")} Nejat Murad
            </p>
            <Image
              src="/assets/images/avatar.png"
              width={30}
              height={30}
              alt="avatar image"
              className="rounded-lg"
            />
          </div>
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-12T10:30:00").toDate(),
    end: moment("2025-01-12T11:30:00").toDate(),
    title: "Event 2",
    data: {
      node: (data) => <PotentialToShow data={data} />,
    },
  },
  {
    start: moment("2025-01-15T10:00:00").toDate(),
    end: moment("2025-01-15T11:00:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#cc7428] rounded-md px-2 py-3 h-full bg-[#fffcf5] animate-pulse-ongoing">
          <span className="bg-[#cc7428] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            LAST MINUTE CANCELLATION
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Noora Knight
          </p>
        </div>
      ),
    },
  },
  // {
  //   start: moment("2025-01-14T12:00:00").toDate(),
  //   end: moment("2025-01-14T13:00:00").toDate(),
  //   title: "Event 4",
  //   data: {
  //     node: (data: any) => (
  //       <div className="relative flex h-full w-full animate-pulse-ongoing">
  //         {/* <span className="animate-ping duration-1.5s absolute inline-flex h-full w-full rounded-full bg-[#fff7f5] opacity-50"></span> */}
  //         <div className="animate border-[3px] border-[#ff6733] rounded-md px-2 py-3 w-full  bg-[#fff7f5]">
  //           <span className="bg-[#ff6733] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
  //             POTENTIAL NO SHOW
  //           </span>
  //           <p className="text-black text-xs xl:text-base mb-2 font-bold">
  //             {moment(data.event.start).format("h:mm a")} Sonya Jess
  //           </p>
  //         </div>
  //       </div>
  //     ),
  //   },
  // },
  {
    start: moment("2025-01-17T11:00:00").toDate(),
    end: moment("2025-01-17T12:00:00").toDate(),
    title: "Event 5",
    data: {
      node: (data: any) => (
        <div className="relative flex h-full w-full animate-pulse-ongoing">
          {/* <span className="animate-ping duration-1.5s absolute inline-flex h-full w-full rounded-full bg-[#fff7f5] opacity-50"></span> */}
          <div className="animate border-[3px] border-[#ff6733] rounded-md px-2 py-3 w-full  bg-[#fff7f5]">
            <span className="bg-[#ff6733] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              POTENTIAL NO SHOW
            </span>
            <p className="text-black text-xs xl:text-base mb-2 font-bold">
              {moment(data.event.start).format("h:mm a")} Josie Fell
            </p>
            <p className="bg-white p-2 rounded-lg border border-dashed border-[#ADB5BD] text-[10px] text-black">
              Contact customer via call and text until 11 AM --&gt;If no
              response offer spot to other customers
            </p>
          </div>
        </div>
      ),
    },
  },
  // confirmed
  {
    start: moment("2025-01-13T09:30:00").toDate(),
    end: moment("2025-01-13T10:30:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] !opacity-10 ">
          <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            Confirmed 2 Hours Ago
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Layla Brown
          </p>
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-14T09:00:00").toDate(),
    end: moment("2025-01-14T10:00:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] !opacity-10 ">
          <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            Confirmed 2 Hours Ago
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Fatima Lee
          </p>
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-14T10:00:00").toDate(),
    end: moment("2025-01-14T11:00:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] !opacity-10 ">
          <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            Confirmed 2 Hours Ago
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Hassan Clark
          </p>{" "}
          Hassan Clark
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-14T11:00:00").toDate(),
    end: moment("2025-01-14T12:00:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] !opacity-10 ">
          <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            Confirmed 2 Hours Ago
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Nora Lopez
          </p>{" "}
          Hassan Clark
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-16T09:00:00").toDate(),
    end: moment("2025-01-16T10:00:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] !opacity-10 ">
          <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            Confirmed 2 Hours Ago
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Hassan Clark
          </p>{" "}
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-16T10:00:00").toDate(),
    end: moment("2025-01-16T11:00:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] !opacity-10 ">
          <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            Confirmed 2 Hours Ago
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Aisha Green
          </p>{" "}
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-16T11:00:00").toDate(),
    end: moment("2025-01-16T12:00:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] !opacity-10 ">
          <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            Confirmed 2 Hours Ago
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Khalid Carte
          </p>{" "}
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-17T09:30:00").toDate(),
    end: moment("2025-01-17T10:30:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] !opacity-10 ">
          <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            Confirmed 2 Hours Ago
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Rana White
          </p>{" "}
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-17T12:00:00").toDate(),
    end: moment("2025-01-17T13:00:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] !opacity-10 ">
          <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            Confirmed 2 Hours Ago
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Rana White
          </p>{" "}
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-12T11:30:00").toDate(),
    end: moment("2025-01-12T12:30:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] !opacity-10 ">
          <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            Confirmed 2 Hours Ago
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Ahmed Joss
          </p>{" "}
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-13T12:00:00").toDate(),
    end: moment("2025-01-13T13:00:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] !opacity-10 ">
          <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            Confirmed 2 Hours Ago
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Travis Fuller
          </p>{" "}
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-15T12:00:00").toDate(),
    end: moment("2025-01-15T13:00:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] !opacity-10 ">
          <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
            Confirmed 2 Hours Ago
          </span>
          <p className="text-black text-xs xl:text-base mb-2 font-bold">
            {moment(data.event.start).format("h:mm a")} Zaid Wilson
          </p>{" "}
        </div>
      ),
    },
  },
];

const components: Components<MyEvent, object> = {
  // timeSlotWrapper: (props) => {
  //   const { step, day, isRender } = props;
  //   return TimeSlot(props, step, day, isRender);
  // },
  // timeSlotWrapper: (props) => TimeSlot(props),
  event: ({ event }) => {
    return <>{event?.data?.node({ event })}</>;
  },
  toolbar: ({ onNavigate, label, onView, view }) => {
    return (
      <div className="flex justify-between mb-10 sticky left-0 top-0">
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
};

const MyCalendar = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const updateTimeIndicator = (view) => {
        const timeIndicator = document.querySelector(
          ".rbc-current-time-indicator"
        );
        console.log(timeIndicator);

        if (timeIndicator) {
          const nDayOfWeek = moment().day();
          let left;
          let width;

          if (view === Views.DAY) {
            left = 0;
            width = 100;
          } else {
            left = (nDayOfWeek - 1) * -100;
            width = 700;
          }

          timeIndicator.style.setProperty("--width", `${width}%`);
          timeIndicator.style.setProperty("--left", `${left}%`);
        }
      };
      updateTimeIndicator("week");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="myCustomHeight w-full px-5 pb-10">
      <Calendar<MyEvent>
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
        className="w-full overflow-auto relative font-roboto"
        defaultView="week"
        components={components}
        min={workingHoursStart}
        max={workingHoursEnd}
        formats={customFormats}

        // show working days only
        // dayPropGetter={(date) => {
        //   const day = date.getDay();
        //   // Hide Saturday (6) and Sunday (0)
        //   if (day === 0 || day === 6) {
        //     return { style: { display: "none" } };
        //   }
        //   return {};
        // }}
      />
    </div>
  );
};

export default MyCalendar;
