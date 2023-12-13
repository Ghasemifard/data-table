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

interface HeaderProps {
  column: any; // Adjust the type as needed
  label: string;
}

const SortableHeader: React.FC<HeaderProps> = ({ column, label }) => (
  <button
    className="flex items-center gap-2"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  >
    <span>{label}</span>
    <FaSort style={{ color: '#9E9E9E' }} />
  </button>
);


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "first_name",
    // header: "First Name",
    header:({ column }) => <SortableHeader column={column} label="First Name" />,
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => <SortableHeader column={column} label="Last Name" />,
  },
  {
    accessorKey: "code",
    header: ({ column }) => <SortableHeader column={column} label="Code" />,
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "status",
    header:({ column }) => <SortableHeader column={column} label="Status" />,
  },
  {
    accessorKey: "access",
    header: ({ column }) => <SortableHeader column={column} label="Access" />,
  },
  {
    accessorKey: "action",
    header: "Action"
  },
];
