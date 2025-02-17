"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { CustomDialog } from "../Dialog";
import { MYTable } from "./Table";

function Waitlist() {
  const [isloggedIn, setIsloggedIn] = React.useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 sm:gap-7 mb-10">
        <p className="font-bold text-2xl sm:text-3xl  w-full sm:w-fit">
          Patient Waitlist
        </p>
        <CustomDialog
          isLoggedin={isloggedIn}
          setIsloggedIn={setIsloggedIn}
          buttonLabel="Waitlist"
          title="Connect with your practice management system"
          subtitle="Where do you keep your patient waitlist?"
        />
        {isloggedIn && <MYTable />}
      </div>
    </>
  );
}

export default Waitlist;
