import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const banks = [
  {
    name: "Discover",
    website: "https://www.discover.com",
    image: "/discover.png", // Replace with the actual image path
  },
  {
    name: "Fidelity",
    website: "https://www.fidelity.com",
    image: "/fed.jpg", // Replace with the actual image path
  },
  {
    name: "Wells Fargo",
    website: "https://www.wellsfargo.com",
    image: "/wells-fargo.png", // Replace with the actual image path
  },
  {
    name: "Huntington Bank",
    website: "https://www.huntington.com",
    image: "/huntington.png", // Replace with the actual image path
  },
  {
    name: "Ally",
    website: "https://www.ally.com",
    image: "/ally.jpg", // Replace with the actual image path
  },
  {
    name: "USAA",
    website: "https://www.usaa.com",
    image: "/usaa.png", // Replace with the actual image path
  },
  {
    name: "American Express",
    website: "https://www.amex.com",
    image: "/ae.jpg", // Replace with the actual image path
  },
];

function Wizrd() {
  return (
    <>
      <div className="text-center mb-10">
        <p className="text-2xl text-center mb-5 font-semibold">
          Connect Your Calender
        </p>
        <p className="text-[#929799] text-xl">
          What appointment booking system do you currently use?
        </p>
      </div>

      <div className="mb-16">
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
          {banks.map((bank) => (
            <Link
              href={bank.website}
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
      </div>

      <div className="flex flex-col gap-12">
        <p className="text-center">
          Just getting started?{" "}
          <Link href="/calender" className="underline">
            Try Grunt Calender
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
