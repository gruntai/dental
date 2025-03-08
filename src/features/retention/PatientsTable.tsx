"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { ManageServicesDialog } from "./ManageServices";
import { DeleteServiceDialog } from "./ConfirmDeleteDialog";
import { PatientChartDialog } from "./PatientChartDialog";
import { EditAIInstructionsDialog } from "./EditAIInstructionsDialog";

// Define the Patient type
type Patient = {
  id: string;
  avatar: string;
  name: string;
  phone: string;
  lastVisit: string;
  serviceType: string;
  dueDate: string;
  nextSteps: string;
  assignedTo: string;
};

// Sample data
const data: Patient[] = [
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
  },
];
// Define columns
const columns: ColumnDef<Patient>[] = [
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
    accessorKey: "serviceType",
    header: "Service Type",
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return <p> Due Date</p>;
    },
  },
  {
    accessorKey: "nextSteps",
    header: "Next Steps",
    cell: ({ row }) => (
      <div className="max-w-[200px]">{row.original.nextSteps}</div>
    ),
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const handleOpenPatientChart =
        table?.options?.meta?.handleOpenPatientChart;
      const handleOpenEditAIOpened =
        table?.options?.meta?.handleOpenEditAIOpened;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Start Process</DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenEditAIOpened}>
              Edit Instructions
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleOpenPatientChart}>
              View Patient Chart
            </DropdownMenuItem>{" "}
            <DropdownMenuItem>Remove Patient</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export function PatientRetentionTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isPatientChartOpened, setIsPatientChartOpened] = useState(false);

  const [isEditAIOpened, setisEditAIOpened] = useState(false);

  // Set up the table
  const table = useReactTable({
    data,
    columns,
    meta: {
      handleOpenPatientChart: () => setIsPatientChartOpened(true),
      handleOpenEditAIOpened: () => setisEditAIOpened(true),
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    // <div className="container mx-auto py-6">
    <>
      <div className="flex flex-col space-y-6">
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-5">
            <Input
              placeholder="Search patients..."
              className="sm:w-80"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <Select defaultValue="all">
              <SelectTrigger className="sm:w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <ManageServicesDialog />
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-md border">
          <Table className="w-[1200px] xl:w-full">
            <TableHeader className="bg-[#f9fafb]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
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
                      <TableCell
                        key={cell.id}
                        className="tex-[#6B7280] font-normal text-xs"
                      >
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

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-7"
            >
              Previous
            </Button>
            {Array.from({ length: table.getPageCount() })
              .map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`${
                    table.getState().pagination.pageIndex === index
                      ? "bg-primary text-primary-foreground"
                      : ""
                  } h-7 aspect-square px-0`}
                  onClick={() => table.setPageIndex(index)}
                >
                  {index + 1}
                </Button>
              ))
              .slice(0, 3)}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-7 "
            >
              Next
            </Button>
          </div>
        </div>
        {isPatientChartOpened && (
          <PatientChartDialog
            open={isPatientChartOpened}
            onOpenChange={setIsPatientChartOpened}
          />
        )}

        {isEditAIOpened && (
          <EditAIInstructionsDialog
            open={isEditAIOpened}
            onOpenChange={setisEditAIOpened}
          />
        )}
      </div>
    </>
    // </div>
  );
}

export default PatientRetentionTable;
