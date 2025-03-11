"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Bell, X, FileEdit, Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useTransition } from "react";

interface PatientChartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditAIInstructionsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isLoading, startTransition] = useTransition();
  const handleCloseDialog = (state: boolean) => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Ensure the transition takes time
      onOpenChange(false);
      handleRemovePointerNone();
    });
  };
  // useEffect(() => {
  //   return () => {
  //     document.body.style.pointerEvents = "";
  //   };
  // }, []);
  const handleRemovePointerNone = () => {
    setTimeout(() => (document.body.style.pointerEvents = ""), 10);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state);
        handleRemovePointerNone();
      }}
    >
      <DialogContent className="max-w-[600px]">
        <DialogHeader className="flex-row items-start space-x-4 space-y-0">
          <div className="space-y-2">
            <h2 className="text-xl text-[#1F2937] font-normal">
              Edit AI Assistant Instructions{" "}
            </h2>
            <p className="text-sm font-normal text-[#4B5563]">
              Customize the follow-up instructions for this patient. The AI
              assistant will execute tasks based on these guidelines.
            </p>
          </div>
        </DialogHeader>
        <hr className="bg-[#E5E7EB] my-2" />

        {/* Notes */}

        <div className="space-y-2">
          <h3 className="text-sm text-[#1F2937] font-normal">
            Instruction Details
          </h3>
          <textarea
            rows={5}
            className="border w-full rounded-md p-2 placeholder:text-[#ADAEBC] text-sm"
            placeholder="Contact patient via SMS first. If no response in 3 days, escalate to phone call. If no answer reach out to another patient on the wait list and offer this appointment slot."
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              handleRemovePointerNone();
            }}
          >
            Close
          </Button>
          <Button
            className="gap-2 bg-[#0f172a] disabled:bg-[#0f172a]/80"
            onClick={() => handleCloseDialog(false)}
            disabled={isLoading}
          >
            Save Changes{" "}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
