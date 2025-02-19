import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ArrowRight } from "lucide-react";
import TakeActionContent1 from "./TakeActionContent1";
import TakeActionContent2 from "./TakeActionContent2";
import NoShow from "./NoShowAction";

interface IActionDialog {
  buttonLabel: string;
  buttonClasses?: string;
  actionType: string;
}

export function ActionDialog({
  buttonLabel,
  buttonClasses,
  actionType,
}: IActionDialog) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = React.useState(true);

  function handleSave() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOpen(false);
    }, 2000);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClasses}>
          {buttonLabel}
          <ArrowRight size={10} />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        {actionType == "noShow" ? (
          <NoShow setIsSaveBtnDisabled={setIsSaveBtnDisabled} />
        ) : actionType == "missed" ? (
          <TakeActionContent1 setIsSaveBtnDisabled={setIsSaveBtnDisabled} />
        ) : (
          <TakeActionContent2 setIsSaveBtnDisabled={setIsSaveBtnDisabled} />
        )}
        <hr className="mt-3 mb-2" />

        <DialogFooter>
          <Button
            className="bg-[#EEF0F3] hover:bg-[#EEF0F3]/80 text-[#616365]  rounded-3xl h-[50px] px-8 text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            Cancel{" "}
          </Button>
          <Button
            className="bg-[#0052ff] hover:bg-[#0052ff]/80 disabled:bg-[#9AB3F2] text-sm font-semibold rounded-3xl h-[50px] px-8   mb-5 sm:mb-0"
            onClick={handleSave}
            disabled={isLoading || isSaveBtnDisabled}
          >
            Save changes{" "}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
