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
import { ChevronLeft, ChevronRight, Clock4, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import zap from "@/assets/icons/zap.svg";

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
        <div className="relative flex h-full w-full animate-pulse-ongoing">
          {/* <span className="animate-ping duration-1.5s absolute inline-flex h-full w-full rounded-full bg-[#fffcf5] opacity-50"></span>{" "} */}
          <div className="border-2 border-[#ffcb34] rounded-md px-2 py-3 w-full h-full bg-[#fffcf5]">
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
      node: (data: any) => {
        console.log(data);
        return (
          <div className="relative flex h-full w-full animate-pulse-ongoing">
            {/* <span className="animate-ping duration-1.5s absolute inline-flex h-full w-full rounded-full bg-[#fff7f5] opacity-50"></span> */}
            <div className="animate border-2 border-[#ff6733] rounded-md px-2 py-3 w-full  bg-[#fff7f5]">
              <div className="flex gap-2 mb-3">
                <span className="bg-[#ff6733] text-white rounded-lg h-8 w-8 flex items-center justify-center text-xs">
                  <Image src={zap} alt="zap icon" width={13} height={13} />
                </span>
                <span className="bg-[#ff6733] text-white rounded-lg px-2 flex items-center text-xs font-semibold">
                  POTENTIAL NO SHOW
                </span>
              </div>
              <p className="text-black text-xs xl:text-base mb-2 font-bold">
                {moment(data.event.start).format("h:mm a")} John Doe
              </p>
              <p className="bg-white p-2 rounded-lg border border-dashed border-[#ADB5BD] text-[10px] text-black">
                Contact customer via call and text until 10 AM --&gt;If no
                response offer spot to other customers
              </p>
            </div>
          </div>
        );
      },
    },
  },
  {
    start: moment("2025-01-15T10:00:00").toDate(),
    end: moment("2025-01-15T11:00:00").toDate(),
    title: "Event 3",
    data: {
      node: (data: any) => (
        <div className="border-2 border-[#cc7428] rounded-md px-2 py-3 h-full bg-[#fffcf5] animate-pulse-ongoing">
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
  {
    start: moment("2025-01-14T12:00:00").toDate(),
    end: moment("2025-01-14T13:00:00").toDate(),
    title: "Event 4",
    data: {
      node: (data: any) => (
        <div className="relative flex h-full w-full animate-pulse-ongoing">
          {/* <span className="animate-ping duration-1.5s absolute inline-flex h-full w-full rounded-full bg-[#fff7f5] opacity-50"></span> */}
          <div className="animate border-2 border-[#ff6733] rounded-md px-2 py-3 w-full  bg-[#fff7f5]">
            <span className="bg-[#ff6733] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              POTENTIAL NO SHOW
            </span>
            <p className="text-black text-xs xl:text-base mb-2 font-bold">
              {moment(data.event.start).format("h:mm a")} Sonya Jess
            </p>
          </div>
        </div>
      ),
    },
  },
  {
    start: moment("2025-01-17T11:00:00").toDate(),
    end: moment("2025-01-17T12:00:00").toDate(),
    title: "Event 5",
    data: {
      node: (data: any) => (
        <div className="relative flex h-full w-full animate-pulse-ongoing">
          {/* <span className="animate-ping duration-1.5s absolute inline-flex h-full w-full rounded-full bg-[#fff7f5] opacity-50"></span> */}
          <div className="animate border-2 border-[#ff6733] rounded-md px-2 py-3 w-full  bg-[#fff7f5]">
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
};

const MyCalendar = () => {
  const today = new Date();
  return (
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
        min={
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10)
        }
        max={
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19)
        }
        formats={customFormats}
      />
    </div>
  );
};

export default MyCalendar;
