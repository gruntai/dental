"use client";
import HeaderSec from "@/components/HeaderSec";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
const statsData = [
  {
    title: "Net Profit / Loss",
    stat: "$24,200",
  },
  {
    title: "Expenses",
    stat: "$18,340",
  },
  {
    title: "Receivables ",
    stat: "$12,120",
  },
  {
    title: "Payables",
    stat: "$3,100",
  },
];

export function AccountingFeat() {
  useEffect(() => {
    document.querySelector(".main")?.classList.add("!bg-white");
    return () => document.querySelector(".main")?.classList.remove("!bg-white");
  }, []);

  return (
    <div>
      <HeaderSec title="My Accounting" cards={statsData} />
      <p className="font-bold text-2xl my-7">See your accounting records</p>
      <div className="flex flex-wrap gap-10 md:gap-5 xs:gap-10 gap-y-5">
        <div className="relative rounded-lg border border-black cursor-pointer w-full sm:w-[45%] md:w-[30%] xl:w-[22%] 2xl:w-[18%] ">
          <Image
            src={"/assets/images/accounting-records/1.svg"}
            alt={"expense"}
            width={500}
            height={500}
            className={"mx-auto w-full"}
          />
          <p className="font-bold text-[17px] sm:w-1/2 pl-3 pb-3">
            {" "}
            Cashflow Statement
          </p>
          <ArrowRight className="absolute bottom-2 right-2" />
        </div>
        <div className="relative rounded-lg border border-black cursor-pointer w-full sm:w-[45%] md:w-[30%] xl:w-[22%] 2xl:w-[18%]">
          <div className="flex items-center ">
            <Image
              src={"/assets/images/accounting-records/2.svg"}
              alt={"expense"}
              width={200}
              height={200}
            />
            <p className="font-bold text-[17px] -ml-5">
              {" "}
              Monthly Profit / Loss statement{" "}
            </p>
          </div>
          <ArrowRight className="absolute bottom-2 right-2" />
        </div>
        <div className="relative rounded-lg border border-black cursor-pointer w-full sm:w-[45%] md:w-[30%] xl:w-[22%] 2xl:w-[18%] py-7 sm:py-0">
          <div className="flex items-center h-full">
            <Image
              src={"/assets/images/accounting-records/3.svg"}
              alt={"expense"}
              width={100}
              height={100}
              className={"sm:mt-10"}
            />
            <p className="font-bold text-xl sm:w-1/2 pl-3 pb-3 -ml-5">
              {" "}
              View your balance sheet{" "}
            </p>
          </div>
          <ArrowRight className="absolute bottom-2 right-2" />
        </div>
        <Link
          href={"/receivables"}
          className="relative rounded-lg border border-black cursor-pointer w-full sm:w-[45%] md:w-[30%] xl:w-[22%] 2xl:w-[18%] "
        >
          <Image
            src={"/assets/images/accounting-records/1.svg"}
            alt={"expense"}
            width={500}
            height={500}
            className={"mx-auto w-full"}
          />
          <p className="font-bold text-[17px] sm:w-1/2 pl-3 pb-3">
            {" "}
            View Receivables{" "}
          </p>
          <ArrowRight className="absolute bottom-2 right-2" />
        </Link>
        <div className="relative rounded-lg border border-black cursor-pointer w-full sm:w-[45%] md:w-[30%] xl:w-[22%] 2xl:w-[18%] h-full py-5">
          <div className="flex sm:block items-center h-full flex-1">
            <Image
              src={"/assets/images/accounting-records/3.svg"}
              alt={"expense"}
              width={100}
              height={100}
              className={""}
            />
            <p className="font-bold text-xl sm:w-1/2 pl-3 sm:pl-7 sm:mx-auto pb-3">
              {" "}
              View Payables{" "}
            </p>
          </div>
          <ArrowRight className="absolute bottom-2 right-2" />
        </div>
      </div>
    </div>
  );
}

export default AccountingFeat;
