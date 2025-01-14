"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const dentalSoftwareCompanies = [
  {
    name: "Weave",
    website: "https://www.getweave.com",
    image: "/weave.avif",
  },
  {
    name: "RevenueWell",
    website: "https://www.revenuewell.com",
    image: "/rw.avif",
  },
  {
    name: "Thryv",
    website: "https://www.thryv.com",
    image: "/thryy.avif",
  },
  {
    name: "Solutionreach",
    website: "https://www.solutionreach.com",
    image: "/sol.avif",
  },
  {
    name: "Adit",
    website: "https://www.adit.com",
    image: "/adit.avif",
  },
  {
    name: "Doctible",
    website: "https://www.doctible.com",
    image: "/docitble.avif",
  },
  {
    name: "Acuity Scheduling",
    website: "https://www.capterra.com/p/191978/Acuity-Scheduling/",
    image: "/aucity.avif",
  },
  {
    name: "Dentrix Ascend",
    website: "https://www.dentrixascend.com",
    image: "/d-ascend.avif",
  },
  {
    name: "Eaglesoft",
    website: "https://www.eaglesoft.com",
    image: "/eagle.avif",
  },
  {
    name: "Curve Dental",
    website: "https://www.curvedental.com",
    image: "/curve.avif",
  },
  {
    name: "Practice-Web",
    website: "https://www.practice-web.com",
    image: "/pw.avif",
  },
  {
    name: "ACE Dental",
    website: "https://www.capterra.com/p/10010533/ACE-Dental/",
    image: "/ace.avif",
  },
  {
    name: "Denticon",
    website: "https://www.planetdds.com/denticon",
    image: "/dentiction.avif",
  },
  {
    name: "ABELDent",
    website: "https://www.abeldent.com",
    image: "/ab.avif",
  },
  {
    name: "Open Dental",
    website: "https://www.opendental.com",
    image: "/od.avif",
  },
  {
    name: "DentiMax",
    website: "https://www.dentimax.com",
    image: "/dm.avif",
  },
  {
    name: "Dentrix",
    website: "https://www.dentrix.com",
    image: "/dentrix.avif",
  },
];

function Wizrd() {
  const [showMore, setShowMore] = React.useState(false);
  let companies = showMore
    ? dentalSoftwareCompanies
    : dentalSoftwareCompanies.slice(0, 8);
  return (
    <>
      <div className="text-center -mt-14 2xl:mt-0 mb-10">
        <p className="text-2xl text-center mb-2 font-semibold">
          Connect Your Phone Provider
        </p>
        <p className="text-[#929799] text-xl">
          What phone provider are you currently using?
        </p>
      </div>

      <div className="mb-12">
        <p className="text-[#848687] font-bold text-center mb-3">
          Type to search or select from an option below
        </p>
        <div className="border border-[#929799] rounded-sm px-2 flex items-center mb-2">
          <Search width={24} height={24} />
          <Input
            className="border-0 !outline-none !ring-0 !shadow-none"
            placeholder="Type the name of the software. For example, 'Google Calendar' or 'iOS Calendar'"
          />
        </div>
        <div className="flex flex-wrap">
          {companies.map((bank) => (
            <Link
              href={"/calender"}
              className="p-1 w-1/2 md:w-1/3 lg:w-1/4"
              key={bank.name}
            >
              <div
                key={bank.name}
                className="flex items-center gap-2 bg-[#ECF0F3] rounded-sm p-3"
              >
                <Image
                  src={`/assets/images/logos${bank.image}`}
                  alt={bank.name}
                  className="object-contain bg-white rounded-sm p-1 w-10 h-10"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="text-xs sm:text-sm">{bank.name}</p>
                  {/* <p>{bank.website}</p> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <span
          className="text-blue-600 underline text-xs cursor-pointer block text-center"
          onClick={() => setShowMore(!showMore)}
        >
          Show {showMore ? "less" : "more"}
        </span>
      </div>

      <div className="flex flex-col gap-5 2xl:gap-12">
        <p className="text-center">
          Provider not listed?{" "}
          <Link href="/calender" className="underline">
            Add Custom
          </Link>
        </p>

        <div className="pt-5 border-t">
          <Button type="submit" className="w-full rounded-full h-12" asChild>
            <Link href="/calender">Continue</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Wizrd;
