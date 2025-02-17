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
  services: string;
  totalSpend: string | number;
  status: {
    text: string;
    type: "routine" | "urgent" | "emergency" | "elective";
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
    patient: { name: "Adil Selma", id: "451-220-0001" },
    services: "Hygiene Service, Endodontics Services",
    totalSpend: 2600.0,
    status: { label: "Routine", type: "routine" },
    nextSteps:
      "A spot just opened up due to a last-minute cancellation. Grunt is contacting the patient to offer them this spot.",
    addedDate: "02/02/2025",
  },
  {
    patient: { name: "Sam Lewis", id: "451-220-0002" },
    services: "Endodontics Services",
    totalSpend: 1750.0,
    status: { label: "Urgent", type: "urgent" },
    nextSteps:
      "A spot just became available due to a last-minute cancellation. Grunt is reaching out to the patient to offer them this spot.",
    addedDate: "02/03/2025",
  },
  {
    patient: { name: "Charles Duncun", id: "451-220-0231" },
    services: "Hygiene Service",
    totalSpend: 270.0,
    status: { label: "Elective", type: "elective" },
    nextSteps:
      "The patient said they can wait, but Grunt is monitoring for any cancellations or potential no-shows to get them in ASAP.",
    addedDate: "02/04/2025",
  },
  {
    patient: { name: "Mary Knight", id: "451-220-9451" },
    services: "Cosmetic Service",
    totalSpend: 3000.0,
    status: { label: "Emergency", type: "emergency" },
    nextSteps:
      "This emergency patient called 2 mins ago, and. Optimizing your schedule to fit them in, even if there’s a short wait.",
    addedDate: "02/06/2025",
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
      <div className="flex items-center justify-between w-28">
        <HeaderText>Services</HeaderText>
        <Button variant="ghost" size={"icon"}>
          <GripVertical />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-xs text-[#A5A5A5] font-semibold  w-36">
        {row.getValue("services")}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "addedDate",
    header: () => (
      <div className="flex items-center w-40">
        <HeaderText>Added Date</HeaderText>
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
        <HeaderText>Severity</HeaderText>
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
        routine: "bg-[#FBEFCC] text-[#927C3C]",
        urgent: "bg-[#F1E0D5] text-[#693124]",
        elective: "bg-[#E8F6E9] text-[#80AD95]",
        emergency: "bg-[#CC7429] text-white",
      };

      return (
        <span
          className={`py-0.5 rounded-[4px] text-[10px] font-semibold w-16 block text-center ${
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
    accessorKey: "nextSteps",
    header: () => (
      <div className="flex items-center w-40">
        <HeaderText>Next step</HeaderText>
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
          {row.getValue("nextSteps")}
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

export function MYTable() {
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
      <div className="flex items-center gap-2 mb-5">
        <SelectComp
          data={appointmentTypes}
          label={
            <div className="flex items-center gap-2">
              <Filter size={14} />
              Filter
            </div>
          }
        />
        <SelectComp
          data={settings}
          label={
            <div className="flex items-center gap-2">
              <Image
                src="/assets/images/icons/settings.png"
                width="13"
                alt="settings icon"
                height="14"
              />{" "}
              <span>Settings</span>
              <Image
                src="/assets/images/icons/downArrow.png"
                width="7"
                alt="arrow down"
                height="5"
              />
            </div>
          }
        />
      </div>
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

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import React from "react";

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
  const [software, setSoftware] = React.useState(data[0].value);
  return (
    <Select name="Country" value={software} onValueChange={setSoftware}>
      <SelectTrigger
        hideChevron={true}
        className="w-fit rounded-[4px]  text-[#7DA295]  border-[#72A094] text-sm font-normal"
      >
        {label}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="text-black/60 text-sm">
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectComp;
