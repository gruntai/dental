"use client";

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
  Filter,
  Settings,
  ArrowDownAZ,
  ArrowDown,
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
import Image from "next/image";

type Patient = {
  patient: {
    name: string;
    id: string;
  };
  totalSpend: string | number;
  status: {
    label: string;
    type: "completed" | "rushOrder" | "pendingPickup" | "pendingDelivery";
  };
  mostRecentService: string;
  id: string;
};

const HeaderText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-[#696969] font-semibold text-xs shrink-0">
    {children}
  </div>
);

export const data: Patient[] = [
  {
    patient: { name: "Adil Selma", id: "451-220-0001" },
    totalSpend: "$3,000",
    status: { label: "Completed", type: "completed" },
    mostRecentService: "Jacket",
    addedDate: "02/02/2025",
  },
  {
    patient: { name: "Sam Lewis", id: "451-220-0002" },
    totalSpend: "$100",
    status: { label: "Rush Order", type: "rushOrder" },
    mostRecentService: "Thoube",
    addedDate: "02/03/2025",
  },
  {
    patient: { name: "Charles Duncun", id: "451-220-0231" },
    totalSpend: "$280.50",
    status: { label: "Pending Pickup", type: "pendingPickup" },
    mostRecentService: "Shirt",
    addedDate: "02/04/2025",
  },
  {
    patient: { name: "Mary Knight", id: "451-220-9451" },
    totalSpend: "$1,600",
    status: { label: "Pending Delivery", type: "pendingDelivery" },
    mostRecentService: "Wedding Dress",
    addedDate: "02/06/2025",
  },
];

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "patient",
    header: () => <HeaderText>Customer Information</HeaderText>,
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
    accessorKey: "totalSpend",
    header: ({ column }) => (
      <div className="flex items-center justify-between w-28">
        <HeaderText>Total Spend</HeaderText>
        <Button variant="ghost" size={"icon"}>
          <GripVertical />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-xs text-[#A5A5A5] font-semibold  w-36">
        {row.getValue("totalSpend")}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "addedDate",
    header: () => (
      <div className="flex items-center w-40">
        <HeaderText>Last Order</HeaderText>
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
    cell: ({ row }) => (
      <div className="text-xs text-[#A5A5A5] font-semibold">
        {row.getValue("addedDate")}
      </div>
    ),
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
        completed: "bg-[#28A745] text-[#fff]",
        rushOrder: "bg-[#F1E0D5] text-[#693124]",
        pendingPickup: "bg-[#E8F6E9] text-[#80AD95]",
        pendingDelivery: "bg-[#CC7429] text-white",
      };

      return (
        <span
          className={`py-0.5 rounded-[4px] text-[10px] font-semibold w-fit px-2 block text-center ${
            statusClasses[status.type] || "bg-gray-200 text-gray-700"
          }`}
        >
          {status.label}
        </span>
      );
    },
    sortingFn: (rowA, rowB) => {
      const nameA = rowA.original.status.label.toLowerCase();
      const nameB = rowB.original.status.label.toLowerCase();
      return nameA.localeCompare(nameB);
    },
  },
  {
    accessorKey: "mostRecentService",
    header: () => (
      <div className="flex items-center w-40">
        <HeaderText>Most Recent Service</HeaderText>
        <Button
          variant="ghost"
          size={"icon"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowDown color="black" size={6} />
        </Button>
        <Button variant="ghost" size={"icon"}>
          <GripVertical />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-between w-[250px]">
        <span className="w-[80%] text-xs font-semibold text-[#A5A5A5]">
          {row.getValue("mostRecentService")}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Start Process</DropdownMenuItem>
            <DropdownMenuItem>Edit Instructions</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Patient Chart</DropdownMenuItem>
            <DropdownMenuItem>Remove Patient</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

const filterCards = [
  {
    title: "Show Everything",
  },
  {
    title: "Expense Type",
  },
  {
    title: "Expense Total",
  },
  {
    title: "Expense By Date",
  },
];

export default function ExpensesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  useEffect(() => {
    document.querySelector(".main")?.classList.add("!bg-white");

    return () => document.querySelector(".main")?.classList.remove("!bg-white");
  }, []);

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
    <div className="w-full mt-10 ">
      <FilterUi title="Filter Expenses By" cards={filterCards} />
      <div className="rounded-md border mt-5">
        <Table className="bg-white">
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

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import FilterUi from "@/components/FilterUi";

const softwareList = [
  { id: 1, label: "Dentrix Ascend", value: "dentrix-ascend" },
  { id: 2, label: "Eaglesoft Cloud", value: "eaglesoft-cloud" },
  { id: 3, label: "Open Dental Cloud", value: "open-dental-cloud" },
  { id: 4, label: "CareStack", value: "carestack" },
  { id: 5, label: "Tab32", value: "tab32" },
  { id: 6, label: "DentiMax Cloud", value: "dentimax-cloud" },
  { id: 7, label: "Curve Dental", value: "curve-dental" },
  { id: 8, label: "Dentrix", value: "dentrix" },
  { id: 9, label: "Eaglesoft", value: "eaglesoft" },
  { id: 10, label: "Open Dental", value: "open-dental" },
  { id: 11, label: "DentiMax", value: "dentimax" },
  { id: 12, label: "SoftDent", value: "softdent" },
  { id: 13, label: "PracticeWorks", value: "practiceworks" },
  { id: 14, label: "OrthoTrac", value: "orthotrac" },
  { id: 15, label: "ABELDent", value: "abeldent" },
  { id: 16, label: "MOGO Cloud", value: "mogo-cloud" },
  { id: 17, label: "axiUm", value: "axium" },
  { id: 18, label: "Fuse", value: "fuse" },
  { id: 19, label: "MacPractice DDS", value: "macpractice-dds" },
  { id: 20, label: "Dovetail", value: "dovetail" },
];
const appointmentTypes = [
  { label: "Emergency", value: "emergency" },
  { label: "Routine", value: "routine" },
  { label: "Urgent", value: "urgent" },
  { label: "Elective", value: "elective" },
];
const settings = [
  { label: "Refresh", value: "Refresh" },
  { label: "Stop Running", value: "StopRunning" },
];
export function SelectComp({ data, label }: { label: Element; data: any[] }) {
  const [software, setSoftware] = React.useState(
    !!data?.length && data[0].value
  );
  return (
    <Select name="Country" value={software} onValueChange={setSoftware}>
      <SelectTrigger
        hideChevron={true}
        className="w-fit rounded-[4px]  text-[#7DA295]  border-[#72A094] text-sm font-normal h-8"
      >
        {label}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="text-black/60 text-sm">
          {!!data?.length &&
            data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
