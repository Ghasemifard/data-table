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
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <FaSort />
        </button>
      );
    },
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "access",
    header: "Access",
  },
];
