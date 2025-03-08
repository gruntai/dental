"use client";

import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { AddServiceDialog } from "./AddNewServiceDialog";
import { DeleteServiceDialog } from "./ConfirmDeleteDialog";

interface Service {
  id: string;
  name: string;
  followUpInterval: string;
  multipleAttempts: boolean;
  escalationTime: string;
}

const initialServices: Service[] = [
  {
    id: "1",
    name: "Cleaning",
    followUpInterval: "6 Months",
    multipleAttempts: true,
    escalationTime: "7 Days",
  },
  {
    id: "2",
    name: "Orthodontics",
    followUpInterval: "2 Weeks",
    multipleAttempts: false,
    escalationTime: "8 Days",
  },
];

interface ManageServicesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageServicesDialog() {
  //     {
  //   open,
  //   onOpenChange,
  // }: ManageServicesDialogProps
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleAttempts = (id: string) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? { ...service, multipleAttempts: !service.multipleAttempts }
          : service
      )
    );
  };

  const [isNewServiceOpened, setIsNewServiceOpened] = useState(false);
  const [isConfirmDeleteOpened, setIsConfirmDeleteOpened] = useState(false);

  return (
    <>
      <Dialog
      // open={open} onOpenChange={onOpenChange}
      >
        <DialogTrigger className="bg-[#0f172a] text-white" asChild>
          <Button variant="default" className="bg-[#0f172a] text-white">
            Edit Services
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-[#1F2937] text-left">
              Manage Services
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-between items-end sm:items-center flex-col sm:flex-row gap-4 my-4">
            <div className="relative flex-1 w-full ">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                className="pl-8  w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              className="bg-[#0f172a] text-white w-fit font-normal"
              onClick={() => setIsNewServiceOpened(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
            {isNewServiceOpened && (
              <AddServiceDialog
                onOpenChange={setIsNewServiceOpened}
                open={isNewServiceOpened}
              />
            )}
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table className="w-[700px] sm:w-full">
              <TableHeader className="bg-[#ebebeb]">
                <TableRow>
                  <TableHead className="text-[#1F2937] font-bold">
                    Service Name
                  </TableHead>
                  <TableHead className="text-[#1F2937] font-bold">
                    Follow-Up Interval
                  </TableHead>
                  <TableHead className="text-[#1F2937] font-bold">
                    Multiple Attempts
                  </TableHead>
                  <TableHead className="text-[#1F2937] font-bold">
                    Escalation Time
                  </TableHead>
                  <TableHead className="text-[#1F2937] font-bold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-normal text-[#1F2937]">
                      {service.name}
                    </TableCell>
                    <TableCell className="font-normal text-[#1F2937]">
                      {service.followUpInterval}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={service.multipleAttempts}
                        onCheckedChange={() => handleToggleAttempts(service.id)}
                      />
                    </TableCell>
                    <TableCell className="font-normal text-[#1F2937]">
                      {service.escalationTime}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsConfirmDeleteOpened(true)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing 1-{filteredServices.length} of {filteredServices.length}{" "}
              services
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary text-primary-foreground"
              >
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                <ChevronRight />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {isConfirmDeleteOpened && (
        <DeleteServiceDialog
          open={isConfirmDeleteOpened}
          onOpenChange={setIsConfirmDeleteOpened}
        />
      )}
    </>
  );
}
