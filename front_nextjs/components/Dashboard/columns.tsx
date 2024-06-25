"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { Checkbox } from "@/registry/new-york/ui/checkbox"

import { priorities, statuses } from "./data/data";
import { Task } from "./data/schema";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { useState } from "react";


export const columns: ColumnDef<Task>[] = [
   
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date_naissance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date de naissance" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
          {
          //@ts-ignore 
          row.getValue("date_naissance")
          // .slice(0, 10) 
        }
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "Status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="status" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="max-w-[500px] truncate font-medium">
  //           {row.getValue("status")}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "latest_exam",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preassure" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("latest_exam")
      );
      const [Color, setColors] = useState("");

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className={
              priority.label === "High" || priority.label === "Low"
                ? "text-red-600 font-bold mr-2 h-4 w-4 text-muted-foreground"
                : "mr-2 h-4 w-4 text-muted-foreground"
            } />
          )}
          <span
            className={
              priority.label === "High" || priority.label === "Low"
                ? "text-red-600 font-bold"
                : ""
            }
          >
            {priority.label}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell:  ({ row }) => { return(<DataTableRowActions row={row}  />);},
  },
];
