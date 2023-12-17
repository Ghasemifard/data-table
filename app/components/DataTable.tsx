"use client";

import { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import debounce from "lodash/debounce";

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
  data = [], // Provide a default value (empty array)
}: DataTableProps<TData, TValue>) {
  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

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

  // Debounce the search input to reduce unnecessary re-renders and API calls
  const handleSearchChange = debounce((value: string) => {
    // Set filter value for the "first_name" column

    table.getColumn("first_name")?.setFilterValue(value);
  }, 100); // Adjust the debounce delay as needed (e.g., 300 milliseconds)

  return (
    <>
      <div
        className={`max-w-7xl container items-center ${
          isDarkMode ? "dark bg-indigo-950 text-white" : "bg-white text-black"
        }`}
      >
        {/* header */}
        <div className="h-16 flex justify-between items-center p-4 max-md:flex-wrap ">
          <div className="flex justify-between w-96 h-8">
            <div className="flex w-36 justify-between items-center">
              <p className="text-xs">Show</p>
              {/* Select Page Size */}
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                //  slate-900 : dark    neutral-200
                className={`w-43 h-31 px-2 py-2 rounded-lg text-xs ${
                  isDarkMode ? "bg-slate-900" : "bg-neutral-200"
                }`}
              >
                {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>

              <p className="text-xs">entries</p>
            </div>
            {/* Search Filter */}
            <div className="flex w-52  items-center border-2 border-neutral-400 rounded-lg justify-start gap-1 p-2">
              <HiMiniMagnifyingGlass style={{ color: "#9E9E9E" }} size={25} />
              <input
                className={`text-xs w-40 font-medium focus:border-none outline-none ${
                  isDarkMode ? "bg-indigo-950" : "bg-white"
                }`}
                placeholder="Search..."
                value={
                  (table.getColumn("first_name")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) => handleSearchChange(event.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-4 max-md:my-6">
            <button
              onClick={toggleDarkMode}
              className="w-12 h-6 rounded-full p-1 bg-gray-200 dark:bg-gray-600 relative transition-colors duration-500 ease-in focus:outline-none 
        focus:ring-2focus:ring-blue-700 dark:focus:ring-blue-600 focus:border-transparent"
            >
              <div
                className="rounded-full w-4 h-4  bg-blue-600  dark:bg-blue-500 relative ml-0 dark:ml-6 pointer-events-none 
              transition-all duration-300 ease-out"
              ></div>
            </button>
            {/* Add Customer */}
            <button className=" flex w-36 h-8 rounded-lg py-2 px-2 items-center justify-center gap-2 bg-indigo-600  text-white text-xs font-bold ">
              <FiPlus style={{ fontWeight: "bold" }} size={20} />{" "}
              <span>Add Customer</span>
            </button>
          </div>
        </div>
        {/* Table */}
        <table className="w-full flex-col max-md:mt-8">
          <thead className=" w-full">
            {/* Render Header Row */}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="w-full flex-row justify-between items-center h-12 p-4 gap-4"
              >
                {/* Render Header Cells */}

                {headerGroup.headers.map((header, index) => {
                  console.log(header, index);

                  return (
                    <th
                      key={header.id}
                      className={`items-center justify-center p-4  gap-4 mx-auto flex-row font-bold text-sm ${ 2 < index && index < 7 ? "max-md:hidden":""} `}
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
              // Rende Table Rows
              table.getRowModel().rows.map((row , index) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`w-full h-16 p-4 gap-4 ${
                    parseInt(row.id) % 2 === 0 ? "even" : ""
                  }`}
                >
                  {/* Render Table Cells */}
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className= {`text-center font-medium text-sm ${ 2 < index && index < 7 ? "max-md:hidden":""}`}
                    >
                      {/*  If it's the last column, render the Trash and Edit icon */}
                      {index === row.getVisibleCells().length - 1 ? (
                        <div className="flex justify-center gap-4  ">
                          <FiEdit style={{ color: "#624DE3" }} size={24} />{" "}
                          <FiTrash2 style={{ color: "#A30D11" }} size={24} />
                        </div>
                      ) : //  If it's the one before the last column: set color and backgroun based on cell content
                      index === row.getVisibleCells().length - 2 ? (
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
                {/* When we have not any row */}
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
              aria-label="Go to previous page"
              className={` font-medium text-sm ${
                isDarkMode ? "text-white" : "text-neutral-400"
              }`}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            {/* three dynamic button between Next and Previous Button */}
            {[...Array(3)].map((_, index) => {
              const pageNumber = table.getState().pagination.pageIndex + index;
              return (
                <button
                  key={index}
                  className={`p-2 px-4 rounded-lg  ${
                    table.getState().pagination.pageIndex === pageNumber
                      ? "bg-indigo-600 text-white "
                      : isDarkMode
                      ? "bg-slate-900"
                      : "bg-neutral-200"
                  }`}
                  onClick={() => table.setPageIndex(pageNumber)}
                  disabled={
                    pageNumber >= 100 / table.getState().pagination.pageSize
                  }
                >
                  {pageNumber + 1}
                </button>
              );
            })}
            <button
              aria-label="Go to next page"
              className={` font-medium text-sm ${
                isDarkMode ? "text-white" : "text-neutral-400"
              }`}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
