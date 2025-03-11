"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectComp from "./patient-waitlist/Select";
import { FormDialog } from "./FormDialog";
import { cn } from "@/lib/utils";

export function CustomDialog({
  isLoggedin,
  setIsloggedIn,
  buttonLabel = "",
  title = "",
  subtitle = "",
}: {
  title: string;
  subtitle?: string;
  isLoggedin: boolean;
  buttonLabel?: string;
  setIsloggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [formDialogOpen, setFormDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSave() {
    setFormDialogOpen(true);
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   setOpen(false);
    // }, 2000);
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {isLoggedin && (
          <Button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                setIsloggedIn(false);
              }, 2000);
            }}
            className={cn(
              "bg-[#D32F2F] hover:bg-[#D32F2F]/80 rounded-[5px] sm:h-7 w-full sm:w-fit disabled:bg-[#D32F2F]/50",
              {
                "w-full sm:w-fit": buttonLabel == "Waitlist",
              }
            )}
            disabled={isLoading}
          >
            Disconnect {buttonLabel}
          </Button>
        )}
        {!isLoggedin && (
          <DialogTrigger asChild>
            <Button
              className={cn(
                "bg-[#28A745] hover:bg-[#28A745]/80 rounded-[5px] sm:h-7 sm:w-fit",
                {
                  "w-full sm:w-fit": buttonLabel == "Waitlist",
                }
              )}
            >
              Connect {buttonLabel}
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className="">
          <div className="mb-5">
            <p className="text-[#606060] font-semibold text-lg">{title} </p>
            <p className="text-[#A2A3A7] text-sm font-semibold">{subtitle} </p>
          </div>
          <SelectComp />
          <DialogFooter className="mt-10">
            <Button
              className="bg-[#EEF0F3] hover:bg-[#EEF0F3]/80 text-[#616365]  rounded-3xl h-[50px] px-8 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Cancel{" "}
            </Button>
            <FormDialog
              isLoggedin={isLoggedin}
              setIsloggedIn={setIsloggedIn}
              closeMainModal={() => setOpen(false)}
              subTitle={
                buttonLabel == "Waitlist"
                  ? "connect to your waitlist"
                  : title.toLowerCase()
              }
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
