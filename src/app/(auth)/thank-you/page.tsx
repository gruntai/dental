"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();
  return (
    <div className="-mt-14">
      <div className="flex flex-col gap-2 text-center mb-5">
        <p className="text-balance text-2xl font-normal text-[#141417] flex items-center gap-3 justify-center mb-5">
          <Image
            src="/assets/images/hand.png"
            width={30}
            height={30}
            alt="hand image"
            className="text-[#141417] text-center"
          />
          Thanks for signing up{" "}
        </p>
        <p className="text-[#141417] mb-16 sm:w-[80%] lg:w-[70%] mx-auto text-sm">
          We’ve received your request, and a team member will reach out to you
          shortly to set up everything according to your organization's needs.
        </p>
        <Button
          onClick={() => router.push("/login")}
          className="w-full rounded-3xl h-12"
        >
          Go Back{" "}
        </Button>
      </div>
    </div>
  );
}

export default page;
