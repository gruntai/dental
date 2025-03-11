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
import { ReactNode, useEffect, useState } from "react";
import PotentialToShow from "./potiential-to-show";
import TimeSlot from "./timeslot";
import Provider from "./provider";
import FilterUi from "@/components/FilterUi";

// Define the event type
type MyEvent = {
  start: Date;
  end: Date;
  title: string;
  data: {
    node?: (data: any) => ReactNode;
  };
};

const localizer = momentLocalizer(moment); // or globalizeLocalizer
const today = new Date();
// 1 - 9

const workingHoursStart = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  9,
  0,
  0
); // 9 AM
const workingHoursEnd = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  18,
  0,
  0
); // 5 PM

const customFormats = {
  dayFormat: (date: Date, culture?: string) => moment(date).format("ddd DD/MM"),
  timeGutterFormat: "HH",
  eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
  monthHeaderFormat: "MMMM YYYY",
  dayHeaderFormat: "dddd, MMMM D, YYYY",
};

const currentDate = new Date();
console.log("currentDate", currentDate.toISOString());
const currentDay = String(currentDate.getDate()).padStart(2, "0");
// const currentHour = currentDate.getHours();
const currentHour = 9;

console.log(currentHour);
console.log(`2025-02-${currentDay}T${currentHour}:00:00`);

console.log(
  moment(
    `2025-02-${currentDay}T${String(currentHour + 1).padStart(2, "0")}:30:00`
  ).toDate()
);

// Example events
function getEvents(hasNoShows?: boolean) {
  const events: MyEvent[] = [
    {
      start: moment("2025-01-12T09:00:00").toDate(),
      end: moment("2025-01-12T10:00:00").toDate(),
      title: "Event 1",
      data: {
        node: (data: any) => (
          <div className="relative flex h-full w-full z-10 ">
            {/* line */}
            <div
              className={`border-[3px] border-[#ffcb34] rounded-md px-2 py-3 w-full h-full bg-[#fffcf5]`}
            >
              <span className="bg-[#ffcb34] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
                ONGOING
              </span>
              <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
          <div
            className={`border-[3px] border-[#cc7428] rounded-md px-2 py-3 h-full bg-[#fffcf5] animate-pulse-ongoing`}
          >
            <span className="bg-[#cc7428] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              LAST MINUTE CANCELLATION
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
    //         <div className={`border-[3px] border-[#ff6733] rounded-md px-2 py-3 w-full  bg-[#fff7f5]`}>
    //           <span className="bg-[#ff6733] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
    //             POTENTIAL NO SHOW
    //           </span>
    //           <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
            <div
              className={`border-[3px] border-[#ff6733] rounded-md px-2 py-3 w-full  bg-[#fff7f5]`}
            >
              <span className="bg-[#ff6733] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
                POTENTIAL NO SHOW
              </span>
              <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
                {moment(data.event.start).format("h:mm a")} Josie Fell
              </p>
              <p className="bg-white p-2 rounded-lg border border-dashed border-[#ADB5BD] text-[10px] text-[#1C1F23]">
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
          <div
            className={`border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] ${
              hasNoShows ? "!opacity-10" : ""
            } `}
          >
            <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              Confirmed 2 Hours Ago
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
          <div
            className={`border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] ${
              hasNoShows ? "!opacity-10" : ""
            } `}
          >
            <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              Confirmed 2 Hours Ago
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
          <div
            className={`border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] ${
              hasNoShows ? "!opacity-10" : ""
            } `}
          >
            <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              Confirmed 2 Hours Ago
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
          <div
            className={`border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] ${
              hasNoShows ? "!opacity-10" : ""
            } `}
          >
            <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              Confirmed 2 Hours Ago
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
              {moment(data.event.start).format("h:mm a")} Nora Lopez
            </p>{" "}
            Hassan Clark
          </div>
        ),
      },
    },
    {
      start: moment("2025-01-14T12:00:00").toDate(),
      end: moment("2025-01-14T13:00:00").toDate(),
      title: "Event 5",
      data: {
        node: (data: any) => (
          <div className="relative flex h-full w-full animate-pulse-ongoing">
            {/* <span className="animate-ping duration-1.5s absolute inline-flex h-full w-full rounded-full bg-[#fff7f5] opacity-50"></span> */}
            <div
              className={`border-[3px] border-[#ff6733] rounded-md px-2 py-3 w-full  bg-[#fff7f5]`}
            >
              <span className="bg-[#ff6733] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
                POTENTIAL NO SHOW
              </span>
              <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
                {moment(data.event.start).format("h:mm a")} Mahmoud Sangh
              </p>
            </div>
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
          <div
            className={`border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] ${
              hasNoShows ? "!opacity-10" : ""
            } `}
          >
            <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              Confirmed 2 Hours Ago
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
          <div
            className={`border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] ${
              hasNoShows ? "!opacity-10" : ""
            } `}
          >
            <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              Confirmed 2 Hours Ago
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
          <div
            className={`border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] ${
              hasNoShows ? "!opacity-10" : ""
            } `}
          >
            <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              Confirmed 2 Hours Ago
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
          <div
            className={`border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] ${
              hasNoShows ? "!opacity-10" : ""
            } `}
          >
            <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              Confirmed 2 Hours Ago
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
          <div
            className={`border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] ${
              hasNoShows ? "!opacity-10" : ""
            } `}
          >
            <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              Confirmed 2 Hours Ago
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
          <div
            className={`border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] ${
              hasNoShows ? "!opacity-10" : ""
            } `}
          >
            <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              Confirmed 2 Hours Ago
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
          <div
            className={`border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] ${
              hasNoShows ? "!opacity-10" : ""
            } `}
          >
            <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              Confirmed 2 Hours Ago
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
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
          <div
            className={`border-[3px] border-[#29CC39] rounded-md px-2 py-3 h-full bg-[#fffcf5] ${
              hasNoShows ? "!opacity-10" : ""
            } `}
          >
            <span className="bg-[#29CC39] text-white rounded-md px-2 py-1 text-xs mb-3 w-fit block font-semibold">
              Confirmed 2 Hours Ago
            </span>
            <p className="text-[#4D5E80] text-xs xl:text-base mb-2 font-bold">
              {moment(data.event.start).format("h:mm a")} Zaid Wilson
            </p>{" "}
          </div>
        ),
      },
    },
  ];
  return events;
}

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
          className="w-fit text-[#6B7A99] font-bold rounded-3xl border-[#F5F6F7] border-2"
          onClick={() => onNavigate("TODAY")}
        >
          Today
        </Button>
        <div className="gap-5 flex items-center">
          <Button
            variant={"outline"}
            className="w-10 h-10 rounded-full text-[#6B7A99] font-bold border-[#F5F6F7] border-2 group"
            onClick={() => onNavigate("PREV")}
          >
            <ChevronLeft
              className="text-[#C3CAD9] group-hover:text-black duration-300 "
              strokeWidth={3}
            />
          </Button>
          <span className="rbc-toolbar-label">{label}</span>

          <Button
            variant={"outline"}
            className="w-10 h-10 rounded-full text-[#6B7A99] font-bold border-[#F5F6F7] border-2 group"
            onClick={() => onNavigate("NEXT")}
          >
            <ChevronRight
              className="text-[#C3CAD9] group-hover:text-black duration-300 "
              strokeWidth={3}
            />
          </Button>
        </div>

        <div className="border rounded-3xl overflow-hidden">
          {["Month", "Week", "Day"].map((type) => (
            <Button
              variant={"outline"}
              key={type}
              onClick={() => onView(type.toLowerCase() as View)}
              className={cn(
                "border-0 border-l rounded-none text-[#ADB8CC] font-bold  border-[#F5F6F7] hover:text-[#6B7A99] duration-300",
                {
                  "text-[#6B7A99]": view === type.toLowerCase(),
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

const filterCards = [
  {
    title: "Show Everything",
  },
  {
    title: "Potential No Shows",
  },
  {
    title: "Unscheduled Treatments",
  },
  {
    title: "Scheduled Recalls",
  },
  {
    title: "New Patient Lead",
  },
];

const MyCalendar = ({ hasNoShows }: { hasNoShows?: boolean }) => {
  const [currentView, setCurrentView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const handleViewChange = (view: View) => {
    console.log("Current View:", view); // Logs the current view ('month', 'week', 'day', etc.)
    setCurrentView(view);
  };
  useEffect(() => {
    //   const timer = setTimeout(() => {
    //     const updateTimeIndicator = (view) => {
    //       console.log(timeIndicator);

    //       if (timeIndicator) {
    //         const nDayOfWeek = moment().day();
    //         let left;
    //         let width;
    setTimeout(() => {
      const timeIndicator = document.querySelector(
        ".rbc-current-time-indicator"
      );

      // const indicator = document.querySelector(".custom-line");
      const indicatorWrapper = document.querySelector(
        ".rbc-time-gutter.rbc-time-column .rbc-timeslot-group"
      );
      indicatorWrapper.style.position = "relative";
      // Create the new div element
      const customLine = document.createElement("div");
      const heightOfCell = 150;
      // Add styles to match Tailwind classes
      customLine.style.position = "absolute";
      customLine.style.height = "2px";
      customLine.style.width = "1800px";
      customLine.style.backgroundColor = "#ff6633";
      customLine.style.top = `${50 + 0 * heightOfCell}px`;
      customLine.style.zIndex = "50";
      customLine.style.left = "3px";

      // Add a custom class name for any additional targeting if needed
      customLine.classList.add("custom-line");

      // Append the created div to the parent
      indicatorWrapper?.appendChild(customLine);
      console.log(customLine);

      console.log(currentView);
      let indicatorStyle = { left: 0, width: 0 };
      if (currentView === Views.DAY) {
        indicatorStyle.left = -4.85;
        indicatorStyle.width = 1788;
      } else {
        indicatorStyle.left = -434;
        indicatorStyle.width = 1794;
      }
      console.log("this is indeicator");

      console.log(timeIndicator);
      if (timeIndicator) {
        timeIndicator.style.width = `${indicatorStyle.width}px`;
        timeIndicator.style.left = `${indicatorStyle.left}%`;
      }
      // if (indicator) {
      //   if (currentView === Views.DAY) {
      //     indicator.style.width = "105%";
      //   } else {
      //     indicator.style.width = "767%";
      //   }
      // }
    }, 0);

    //       }
    //     };
    //     updateTimeIndicator("week");
    //   }, 1000);
    //   return () => clearTimeout(timer);
  }, [currentView]);
  return (
    <Provider>
      <div className="myCustomHeight w-full px-5 pb-10 space-y-12">
        <FilterUi title="Filter Calender By" cards={filterCards} />
        <Calendar<MyEvent>
          onView={handleViewChange}
          view={currentView}
          date={date} // Include the date prop
          onNavigate={(date) => {
            setDate(new Date(date));
          }}
          localizer={localizer}
          events={getEvents(hasNoShows)}
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
    </Provider>
  );
};

export default MyCalendar;
