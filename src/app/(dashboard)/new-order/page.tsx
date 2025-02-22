import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="">
      <div className="space-y-5">
        <Link
          href="/overview"
          className={buttonVariants({
            className:
              "bg-white hover:bg-white border-black border text-sm font-semibold !text-black rounded-[5px] sm:h-8 !py-0 px-4",
          })}
        >
          Back To Main{" "}
        </Link>
        <div className="flex justify-center flex-wrap gap-y-10">
          <div className="space-y-5 w-full md:w-1/2">
            <p className="text-[28px] font-semibold text-[#3D3D41]">
              Enter Order Information{" "}
            </p>
            <div className="space-y-3 md:max-w-xs">
              <div className="flex  items-center justify-between">
                <span className="text-base">Customer information</span>
                <span className="text-[#016FD0] text-xs font-normal">
                  New Customer?
                </span>
              </div>
              <Input
                className="border-[#D3D3D3] placeholder:text-[#828282] placeholder:text-xs"
                placeholder="Enter customer name, phone number or email"
              />
            </div>
          </div>
          <div className="w-full md:max-w-sm md:w-1/2">
            <h2 className="mb-10 text-[#907C65] text-4xl font-bold">
              Order Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#948D85] text-lg font-medium">
                  Quantity
                </span>
                <span className="text-[#544330] text-lg font-medium">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#948D85] text-lg font-medium">
                  Sub Total
                </span>
                <span className="text-[#544330] text-lg font-medium">
                  $25.00
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#948D85] text-lg font-medium">
                  Sales Tax (13%)
                </span>
                <span className="text-[#544330] text-lg font-medium">
                  $3.25
                </span>
              </div>
            </div>
            <hr className="border-black my-10" />
            <div className="flex justify-between items-center mb-10">
              <span className="text-[#948D85] text-lg font-medium">
                Payment Due
              </span>
              <span className="text-[#544330] text-lg font-medium">$28.25</span>
            </div>
            <Button className="w-full rounded-3xl mb-3">Place Order</Button>
            <Button variant={"outline"} className="w-full rounded-3xl border-black">
              {" "}
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
