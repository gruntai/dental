"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, ShieldCheck, Trash2 } from "lucide-react";
import { useTransition } from "react";

interface DeleteServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteServiceDialog({
  open,
  onOpenChange,
}: DeleteServiceDialogProps) {
  const [isLoading, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Ensure the transition takes time
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal mb-5">
            Confirm Service Deletion
          </DialogTitle>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#E5E7EB]">
              <AlertTriangle className="h-6 w-6 text-muted-foreground flex-shrink-0" />
            </div>
            <div>
              <DialogDescription className="text-base text-[#404040]">
                Are you sure you want to remove this service?
              </DialogDescription>
              <DialogDescription className="text-sm text[#737373]">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-muted/50 rounded-lg p-4 my-4">
          <div className="flex items-center gap-2 mb-2">
            {/* <div className="h-4  w-4"> */}
            <ShieldCheck size={14} />
            {/* </div> */}
            <h3 className="font-normal">Cleaning Service</h3>
          </div>
          <div className="flex items-center gap-1 pl-7">
            <div className="text-sm text-[#737373] font-normal">
              <p>Follow-up interval: 6 months</p>
              <p>Escalation Time: 3 days after no response</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            // variant="destructive"
            className="bg-[#0f172a] text-white disabled:bg-[#0f172a]/80"
            onClick={onDelete}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
