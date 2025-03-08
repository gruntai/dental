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
  patient: {
    id: string;
    name: string;
    avatar: string;
    dateOfBirth: string;
    phone: string;
    lastVisit: string;
    treatmentHistory: {
      date: string;
      procedure: string;
      type: string;
      observations?: string[];
      notes?: string;
    }[];
    nextVisit: string;
    notes?: string;
  };
}

export function PatientChartDialog({
  open,
  onOpenChange,
}: PatientChartDialogProps) {
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

  const patient = {
    treatmentHistory: [
      {
        date: "09/10/2023",
        type: "Scaling & Root Planing",
        procedure: "Deep Cleaning & Scaling",
        observations: [
          "Moderate tartar buildup on lower molars, calculus removed",
          "Mild gingivitis observed, no deep periodontal pockets detected",
          "Advised improved flossing routine and prescribed chlorhexidine mouthwash",
        ],
      },
    ],
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state);
        handleRemovePointerNone();
      }}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader className="flex-row items-start space-x-4 space-y-0">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <img
              src={"https://api.dicebear.com/7.x/lorelei/svg?seed=John"}
              alt="Patient avatar"
              // width={40}
              // height={40}

              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold">
              Patient Chart - Nejat Murad
            </h2>
            <p className="text-xs font-semibold text-[#B3B5B9]">451-220-0001</p>
          </div>
        </DialogHeader>

        {/* Basic Information */}
        <div className="grid grid-cols-3 gap-6 p-4 bg-[#f9fafc] rounded-md font-semibold">
          <div>
            <p className="text-xs text-[#B0B3B9]">Date of Birth</p>
            <p className="text-xs">04/22/1988</p>
          </div>
          <div>
            <p className="text-xs text-[#B0B3B9]">Phone</p>
            <p className="text-xs">(451) 220-0001</p>
          </div>
          <div>
            <p className="text-xs text-[#B0B3B9]">Last Visit</p>
            <p className="text-xs bg-[#e5e6eb] py-1 px-2 rounded-sm w-fit">
              6 Months Ago (03/01/2025)
            </p>
          </div>
        </div>

        {/* Treatment History */}
        <div className="space-y-4">
          <h3 className="text-sm text-[#6D6D6D] font-semibold">
            Treatment History
          </h3>

          {patient.treatmentHistory.map((visit, index) => (
            <div
              key={visit.date}
              className="rounded-lg border bg-card p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#828282] font-semibold">
                  Last Visit-{visit.date}
                </p>
                <Badge className="bg-[#E5E6EA] text-black hover:bg-[#c9cace] font-semoibold rounded-sm text-xs">
                  {visit.type}
                </Badge>
              </div>

              <div className="space-y-2 text-[#8B8B8B] text-[11px] font-semibold">
                <p>Procedure: {visit.procedure}</p>
                {visit.observations && (
                  <div className="space-y-1">
                    <p>Observations:</p>
                    <ul className="space-y-1 list-disc pl-4">
                      {visit.observations.map((observation, i) => (
                        <li key={i}>{observation}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* {visit.notes && <p className="text-sm">{visit.notes}</p>} */}
              </div>
            </div>
          ))}
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#828282] font-semibold">
                Previous Visit -03/05/2023
              </p>
              <Badge className="bg-[#E5E6EA] text-black hover:bg-[#c9cace] font-semoibold rounded-sm text-xs">
                Routine Prophylaxis Cleaning{" "}
              </Badge>
            </div>

            <div className="space-y-2 text-[#8B8B8B] text-[11px] font-semibold">
              <p>
                Standard dental cleaning - No major concerns, good oral hygiene
              </p>
            </div>
          </div>
        </div>

        {/* Next Recommended Visit */}
        <div className=" bg-[#f9fafc] rounded-sm px-3 py-4 flex items-start justify-between">
          <div>
            <h3 className="text-xs text-[#777879] font-semibold">
              Next Recommended Visit
            </h3>

            <p className="text-xs text-[#767779] font-semibold">03/10/2025</p>
            <Button
              variant="secondary"
              className="bg-[#82C02D] hover:bg-[#82C02D]/80 text-black border-0 h-5 rounded-sm px-2 text-[6px]"
            >
              <img
                src="https://s3-alpha-sig.figma.com/img/acc6/2e6b/e77dab9bfa824988ddae3b7fa275b7e6?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RauH8fSVSQR9X9ocuqN0TqzRjbL-IUpJeTuG5TbaP3-T6EJYTNdGF0988Tv1YJViRBCQWaiBA-hcftMOBS5IvNvWwk9ackfRJJBsNppR0AoeY5Ls35-LOQV7qNPMY2zZHHNRNhMUixjotkGDuJk2AsH4v3kXip9wQGYiY2SQoI3DMVDWz63Ldw4Y2-u7O55gOU1RxzRe~u2znYYQmoWXO1pyy0xUhF-Z1kTwWjQ~5YQjZ4vmGc8ds02A9myKWduLgFL-F75LJ1DkrxliEUjqnXSppg9zrIJXnnVFF811Sv6u1vdaLxpLei65QMZe56axajDTZfMrO7uourC8RnMoXw__"
                width={6}
                height={6}
              />{" "}
              Mark Complete
            </Button>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Button className="gap-2 h-8">
                <Calendar className="h-4 w-4" />
                <span className="text-[#969BA5] text-xs">
                  Schedule Follow-Up
                </span>
              </Button>
              <Button variant="outline" className="gap-2 rounded-none  px-5">
                <Bell className="h-4 w-4" />

                <span className="text-[#7B7C7D] text-xs"> Send Reminder</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Notes */}

        <div className="space-y-2">
          <h3 className="text-sm text-[#727272] font-semibold">Notes</h3>
          <textarea
            rows={5}
            className="border w-full rounded-md p-2"
            placeholder="Patient reported mild sensitivity post-cleaning. Monitor on next visit."
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
            <FileEdit className="h-4 w-4" />
            Edit Patient Chart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
