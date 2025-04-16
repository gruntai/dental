import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

// Define the Patient type
export type Patient = {
  id: string;
  avatar: string;
  name: string;
  phone: string;
  lastVisit: string;
  serviceType: string;
  dueDate: string;
  nextSteps: string;
  assignedTo: string;
  status: "active" | "inactive";
  recallSpend: string;
};

// Sample data
export const data: Patient[] = [
  {
    id: "1",
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Nejat Murad",
    phone: "1-413-904-5843",
    lastVisit: "Jan 15, 2025",
    serviceType: "Dental Cleaning",
    dueDate: "Feb 15, 2025",
    nextSteps: "Your AI assistant will contact patient tomorrow for recall.",
    assignedTo: "Dr. Smith",
    status: "inactive",
    recallSpend: "$8651.00",
  },
  {
    id: "2",
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Layla Karim",
    phone: "1-917-555-1234",
    lastVisit: "Feb 10, 2025",
    serviceType: "Teeth Whitening",
    dueDate: "Mar 10, 2025",
    nextSteps: "Follow-up call scheduled for next week.",
    assignedTo: "Dr. Johnson",
    status: "active",
    recallSpend: "$1854.00",
  },
  {
    id: "3",
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Omar Hussein",
    phone: "1-305-789-4567",
    lastVisit: "Dec 20, 2024",
    serviceType: "Root Canal",
    dueDate: "Jan 20, 2025",
    nextSteps: "Reminder email will be sent in 2 days.",
    assignedTo: "Dr. Williams",
    status: "active",
    recallSpend: "$1234.00",
  },
  {
    id: "4",
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Aisha Khan",
    phone: "1-818-222-7890",
    lastVisit: "Jan 5, 2025",
    serviceType: "Braces Consultation",
    dueDate: "Feb 5, 2025",
    nextSteps: "Schedule next appointment for braces fitting.",
    assignedTo: "Dr. Brown",
    status: "inactive",
    recallSpend: "$1234.00",
  },
  {
    id: "5",
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Yusuf Malik",
    phone: "1-646-333-6789",
    lastVisit: "Nov 28, 2024",
    serviceType: "Tooth Extraction",
    dueDate: "Dec 28, 2024",
    nextSteps: "Confirm pain management plan for post-op recovery.",
    assignedTo: "Dr. Adams",
    status: "active",
    recallSpend: "$5434.00",
  },
];

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: "Patient Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <img
            src={"https://api.dicebear.com/7.x/lorelei/svg?seed=John"}
            alt="Patient avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-normal text-[#111827]">{row.original.name}</div>
          <div className="text-xs">{row.original.phone}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "lastVisit",
    header: ({ column }) => {
      return <p> Last Visit</p>;
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
  },

  {
    accessorKey: "assstatusignedTo",
    header: "Status",
    cell: ({ row }) => <div className="text-[#6B7280] text-sm">{row.original.status}</div>,
  },
  {
    accessorKey: "recallSpend",
    header: "Recall Spend",
    cell: ({ row }) => <div className="text-[#6B7280] text-lg">{row.original.recallSpend}</div>,
  },
];
