"use client";

import type React from "react";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddEditServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: ServiceFormData) => void;
  initialData?: ServiceFormData;
}

interface ServiceFormData {
  serviceName: string;
  followUpInterval: string;
  timeUnit: string;
  multipleAttempts: boolean;
  communicationPreferences: {
    texting: boolean;
    calling: boolean;
    email: boolean;
  };
  escalateAfter: string;
}

const defaultFormData: ServiceFormData = {
  serviceName: "",
  followUpInterval: "",
  timeUnit: "Days",
  multipleAttempts: false,
  communicationPreferences: {
    texting: false,
    calling: false,
    email: false,
  },
  escalateAfter: "",
};

export function AddServiceDialog({
  open,
  onOpenChange,
  onSave = (atg) => {},
  initialData = defaultFormData,
}: AddEditServiceDialogProps) {
  const [formData, setFormData] = useState<ServiceFormData>(initialData);
  const [isLoading, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Ensure the transition takes time
      onSave(formData);
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#0f172a] text-white w-fit font-normal">
          <Plus className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal text-[#1F2937]">
            Add/Edit Follow-Up Service
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Service Name */}
            <div className="space-y-2">
              <Label
                className="text-xs text-[#374151] font-normal"
                htmlFor="serviceName"
              >
                Service Name
              </Label>
              <Input
                id="serviceName"
                placeholder="Enter service name"
                className="placeholder:text-[#ADAEBC]"
                value={formData.serviceName}
                onChange={(e) =>
                  setFormData({ ...formData, serviceName: e.target.value })
                }
              />
            </div>

            {/* Follow-Up Interval */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  className="text-xs text-[#374151] font-normal"
                  htmlFor="followUpInterval"
                >
                  Follow-Up Interval
                </Label>
                <Input
                  id="followUpInterval"
                  type="number"
                  placeholder="30"
                  className="placeholder:text-[#ADAEBC]"
                  value={formData.followUpInterval}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      followUpInterval: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  className="text-xs text-[#374151] font-normal"
                  htmlFor="timeUnit"
                >
                  Time Unit
                </Label>
                <Select
                  value={formData.timeUnit}
                  onValueChange={(value) =>
                    setFormData({ ...formData, timeUnit: value })
                  }
                >
                  <SelectTrigger id="timeUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Days">Days</SelectItem>
                    <SelectItem value="Weeks">Weeks</SelectItem>
                    <SelectItem value="Months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Multiple Attempts */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs text-[#374151] font-normal">
                  Enable Multiple Attempts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Faster usage consumption with better results
                </p>
              </div>
              <Switch
                checked={formData.multipleAttempts}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, multipleAttempts: checked })
                }
              />
            </div>

            {/* Communication Preferences */}
            <div className="space-y-4">
              <Label className="text-xs text-[#374151] font-normal">
                Communication Preferences
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="texting"
                    checked={formData.communicationPreferences.texting}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        communicationPreferences: {
                          ...formData.communicationPreferences,
                          texting: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label
                    className="text-xs text-[#374151] font-normal"
                    htmlFor="texting"
                  >
                    Enable Texting Customers
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="calling"
                    checked={formData.communicationPreferences.calling}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        communicationPreferences: {
                          ...formData.communicationPreferences,
                          calling: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label
                    className="text-xs text-[#374151] font-normal"
                    htmlFor="calling"
                  >
                    Enable Calling Customers
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email"
                    checked={formData.communicationPreferences.email}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        communicationPreferences: {
                          ...formData.communicationPreferences,
                          email: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label
                    className="text-xs text-[#374151] font-normal"
                    htmlFor="email"
                  >
                    Enable Email
                  </Label>
                </div>
              </div>
            </div>

            {/* Escalate After */}
            <div className="space-y-2">
              <Label
                className="text-xs text-[#374151] font-normal"
                htmlFor="escalateAfter"
              >
                Escalate after
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="escalateAfter"
                  type="number"
                  placeholder="7"
                  value={formData.escalateAfter}
                  onChange={(e) =>
                    setFormData({ ...formData, escalateAfter: e.target.value })
                  }
                  className="max-w-[200px] placeholder:text-[#ADAEBC]"
                />
                <span className="text-muted-foreground">
                  days if no response
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0f172a] disabled:bg-[#0f172a]/80"
              disabled={isLoading}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
