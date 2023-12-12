"use client";

import { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import {
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data=[],// Provide a default value (empty array)
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {/* header */}
      <div className="h-16 flex justify-between items-center p-4">
        <div className="flex justify-between w-96 h-8">
          <div className="flex w-36 justify-between items-center">
            <p className="text-xs">Show</p>

            <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
        }}
        className="w-43 h-31 bg-E0E0E0 px-2 py-2 rounded-lg text-xs"
        >
          {[10, 20, 30, 40, 50,100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
             {pageSize}
            </option>
          ))}
        </select>

            <p className="text-xs">entries</p>
          </div>
          <div className="flex w-52  items-center border-2 border-neutral-400 rounded-lg justify-start gap-1 p-2">
            <HiMiniMagnifyingGlass style={{ color: "#9E9E9E" }} size={25} />
            <input
              className="text-xs w-40 font-medium focus:border-none outline-none"
              placeholder="Search..."
              value={
                (table.getColumn("first_name")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("first_name")
                  ?.setFilterValue(event.target.value)
              }
            />
          </div>
        </div>
        <div>
          <button className=" flex w-36 h-8 rounded-lg py-2 px-2 items-center justify-center gap-2 bg-indigo-600  text-white text-xs font-bold ">
            <FiPlus style={{ fontWeight: "bold" }} size={20} />{" "}
            <span>Add Customer</span>
          </button>
        </div>
      </div>
      {/* Table */}
      <table className="w-full flex-col">
        <thead className=" w-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="w-full flex-row justify-between items-center h-12 p-4 gap-4"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className=" items-center justify-center p-4  gap-4 mx-auto flex-row font-bold text-sm "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`w-full h-16 p-4 gap-4 ${
                  parseInt(row.id) % 2 === 0 ? "even" : ""
                }`}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <td key={cell.id} className="text-center font-medium text-sm">
                    {index === row.getVisibleCells().length - 1 ? (
                      // If it's the last column, render the trash icon
                      <div className="flex justify-center gap-4  ">
                        <FiEdit style={{ color: "#624DE3" }} size={24} />{" "}
                        <FiTrash2 style={{ color: "#A30D11" }} size={24} />
                      </div>
                    ) : index === row.getVisibleCells().length - 2 ? (
                      // If it's the last column, render the trash icon
                      <span
                        className={`w-20 px-9 py-3 rounded-3xl ${
                          cell.getValue() === 1
                            ? "text-green-600 bg-emerald-100"
                            : cell.getValue() === 2
                            ? "text-amber-600 bg-orange-100"
                            : "text-red-800 bg-rose-100"
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </span>
                    ) : (
                      // Render cell content
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="h-16 w-full flex items-center justify-center ">
        <div className="container h-8 gap-3 flex items-center justify-center">
          <button
          className="text-neutral-400 font-medium text-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>


    {[...Array(3)].map((_, index) => {
      const pageNumber = table.getState().pagination.pageIndex +index;
      return (
        <button
          key={index}
          className={`p-2 px-4 rounded-lg  ${
            table.getState().pagination.pageIndex === pageNumber ? 'bg-indigo-600 text-white ' : 'bg-neutral-200'
          }`}
          onClick={() => table.setPageIndex(pageNumber)}
          disabled={pageNumber >=100/ table.getState().pagination.pageSize}
        >
          {pageNumber + 1}
        </button>
      );
    })}





          <button
          className="text-neutral-400 font-medium text-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
