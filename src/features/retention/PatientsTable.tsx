"use client";
import { data, columns } from "./constants";
import React, { useState, useEffect } from "react";
import {
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ManageServicesDialog } from "./ManageServices";
import { PatientChartDialog } from "./PatientChartDialog";
import { EditAIInstructionsDialog } from "./EditAIInstructionsDialog";
import { PatientLoading } from "./ProcessLoading";

export function PatientRetentionTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isPatientChartOpened, setIsPatientChartOpened] = useState(false);
  const [isEditAIOpened, setisEditAIOpened] = useState(false);
  const [selectedPatientProcess, setSelectedPatientProcess] =
    useState<Array<{}> | null>(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>();
  function handleStartProcess(id: string) {
    setExpandedRows((prev) => ({ ...prev, [id]: true }));
  }

  const table = useReactTable({
    data,
    columns,
    meta: {
      handleOpenPatientChart: () => setIsPatientChartOpened(true),
      handleOpenEditAIOpened: () => setisEditAIOpened(true),
      handleStartProcess: (id: string) => handleStartProcess(id),
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowCanExpand: () => true,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <>
      <div className="flex flex-col space-y-6">
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
                table.getRowModel().rows.map((row) => {
                  console.log(row.original.name, row.original.id);
                  return (
                    <React.Fragment key={row.id}>
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell, idx) => (
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
                      {expandedRows?.[+row.id + 1] && (
                        <tr>
                          <td
                            colSpan={columns.length}
                            className="border p-4 bg-gray-100"
                          >
                            <PatientLoading />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
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
  );
}

export default PatientRetentionTable;
