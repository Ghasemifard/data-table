"use client";

import { useState } from "react";
import { FiEdit, FiTrash2,FiPlus } from "react-icons/fi";
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
  data,
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
            <select name="rowNum" id="rowNum" className="w-43 h-31 bg-E0E0E0 px-2 py-2 rounded-lg text-xs">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
            <p className="text-xs">entries</p>
          </div>
            <div className="flex w-52  items-center border-2 border-neutral-400 rounded-lg justify-start gap-1 p-2">
            <HiMiniMagnifyingGlass style={{  color: '#9E9E9E' }} size={25}/>
            <input className="text-xs w-40 font-medium focus:border-none outline-none"
            placeholder="Search..."
            value={
              (table.getColumn("first_name")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("first_name")?.setFilterValue(event.target.value)
            }
          />
            </div>
          
        </div>
        <div>
          <button className=" flex w-36 h-8 rounded-lg py-2 px-2 items-center justify-center gap-2 bg-indigo-600  text-white text-xs font-bold ">
          <FiPlus style={{fontWeight:'bold'}} size={20} /> <span>Add Customer</span>
          </button>
        </div>
      </div>
      {/* Table */}
        <table className="w-full flex-col">
          <thead  className=" w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="w-full flex-row justify-between items-center h-12 p-4 gap-4">
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="flex-row justify-center">
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
                <tr key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell, index) => (
                    <td key={cell.id}>
                      {index === row.getVisibleCells().length - 1 ? (
                        // If it's the last column, render the trash icon
                        <div className="flex">
                          <FiEdit /> <FiTrash2 />
                        </div>
                      ) : (
                        // Render cell content
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </>
  );
}
