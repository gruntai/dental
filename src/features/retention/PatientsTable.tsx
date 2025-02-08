"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronsDownUp,
  ChevronDown,
  MoreHorizontal,
  ChevronsUpDown,
  GripVertical,
  Ellipsis,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Patient = {
  patient: {
    name: string;
    id: string;
  };
  services: string;
  totalSpend: string | number;
  status: {
    text: string;
    type: "revisited" | "unscheduled" | "cancelation" | "lastvisit";
  };
  nextSteps: string;
  id: string;
};

const HeaderText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-[#696969] font-semibold text-xs shrink-0">
    {children}
  </div>
);

export const data: Patient[] = [
  {
    patient: { name: "Nejat Murad", id: "451-220-0001" },
    services: "Hygiene Service, Endodontics Services",
    totalSpend: 2600.0,
    status: { label: "Last visit 6 months ago", type: "past-visit" },
    nextSteps: "Your AI assistant will contact patient tomorrow for recall.",
  },
  {
    patient: { name: "John Lee", id: "451-220-0002" },
    services: "Endodontics Services",
    totalSpend: 1750.0,
    status: { label: "Unscheduled Treatment", type: "unscheduled" },
    nextSteps:
      "Currently in the process of explaining the importance of the treatment to patient.",
  },
  {
    patient: { name: "Sam Lee", id: "451-220-0231" },
    services: "Hygiene Service",
    totalSpend: 270.0,
    status: { label: "Revisited 2 days ago", type: "recent-visit" },
    nextSteps:
      "Patient Retained. We will follow up with patient in 6 months for hygiene services.",
  },
  {
    patient: { name: "Sara", id: "451-220-9451" },
    services: "Cosmetic Service",
    totalSpend: 3000.0,
    status: { label: "Last Minute Cancellation", type: "canceled" },
    nextSteps:
      "Patient cancelled last minute so we’re attempting to reschedule patient.",
  },
];

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "patient",
    header: () => <HeaderText>Patient</HeaderText>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 w-52">
        <div className="w-9 h-9 text-[#B8BCC0] bg-[#545a60] rounded-full flex items-center justify-center">
          {(row.getValue("patient")?.name as string)
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </div>
        <div className="flex flex-col font-semibold">
          <span className="text-[#777777] text-xs">
            {row.getValue("patient")?.name}
          </span>
          <span className="text-[#A8A8A8] text-[10px]">
            {row.getValue("patient")?.id}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "services",
    header: ({ column }) => (
      <div className="flex items-center justify-between">
        <HeaderText>Services</HeaderText>
        <Button variant="ghost" size={"icon"}>
          <GripVertical />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-xs text-[#A5A5A5] font-semibold">
        {row.getValue("services")}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "totalSpend",
    header: ({ column }) => (
      <div className="flex items-center">
        <HeaderText>Total Spend</HeaderText>
        <Button
          variant="ghost"
          size={"icon"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ChevronsUpDown />
        </Button>
        <Button variant="ghost" size={"icon"}>
          <GripVertical />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("totalSpend");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return (
        <div className="text-left text-xs text-[#A5A5A5] font-semibold">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="flex items-center w-40">
        <HeaderText>Status</HeaderText>
        <Button
          variant="ghost"
          size={"icon"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ChevronsUpDown />
        </Button>
        <Button variant="ghost" size={"icon"}>
          <GripVertical />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as { label: string; type: string };
      const statusClasses: Record<string, string> = {
        "past-visit": "bg-[#FBEFCC] text-[#927C3C]",
        unscheduled: "bg-[#F1E0D5] text-[#693124]",
        "recent-visit": "bg-[#E8F6E9] text-[#80AD95]",
        canceled: "bg-[#CC7429] text-white",
      };

      return (
        <span
          className={`px-2 py-1 rounded-[4px] text-[10px] font-semibold ${
            statusClasses[status.type] || "bg-gray-200 text-gray-700"
          }`}
        >
          {status.label}
        </span>
      );
    },
  },
  {
    accessorKey: "nextSteps",
    header: () => <HeaderText>Next Steps</HeaderText>,
    cell: ({ row }) => (
      <div className="flex items-center justify-between">
        <span className="w-[80%] text-xs font-semibold text-[#A5A5A5]">
          {row.getValue("nextSteps")}
        </span>
        <Button size={"icon"} variant={"ghost"}>
          <Ellipsis size={20} />
        </Button>
      </div>
    ),
  },
];

export function PatientsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
