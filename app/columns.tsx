"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FaSort } from "react-icons/fa";

// This type is used to define the shape of our data.
export type User = {
  id: number;
  first_name: string;
  last_name: string;
  code: number;
  company: string;
  status: boolean;
  access: "1" | "2" | "3";
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "first_name",
    // header: "First Name",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         <span>First Name</span> 
          <FaSort style={{color:'#9E9E9E'}}  />
        </button>
      );
    },
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => {
        return (
          <button
            className="flex items-center gap-2 justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Last Name</span>
            <FaSort style={{color:'#9E9E9E'}} />
          </button>
        );
      },
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
        return (
          <button
            className="flex items-center gap-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Code</span>
            <FaSort style={{color:'#9E9E9E'}} />
          </button>
        );
      },
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
        return (
          <button
            className="flex items-center gap-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Status</span>
            <FaSort style={{color:'#9E9E9E'}} />
          </button>
        );
      },
  },
  {
    accessorKey: "access",
    header: ({ column }) => {
        return (
          <button
            className="flex items-center gap-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
             <span>Access</span>
            <FaSort style={{color:'#9E9E9E'}} />
          </button>
        );
      },
  },
  {
    accessorKey: "action",
    header: "Action"
  },
];
