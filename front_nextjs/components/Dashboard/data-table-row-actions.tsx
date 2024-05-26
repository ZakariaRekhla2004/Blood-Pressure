"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu1"

import { taskSchema } from "./data/schema"
import { DeletePatient } from "@/dataFetch/DeletePatient"
import { MouseEventHandler, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export  function DataTableRowActions <TData> ({
  row 
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  const task = taskSchema.parse(row.original);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await DeletePatient(task._id);
    setLoading(false);

    if (result.status == 200) {
      toast.success("Patient deleted successfully!");
        router.refresh();
      // Optionally trigger a state update or refresh the data
    } else {
      toast.error("Failed to delete patient.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] bg-white">
        <DropdownMenuItem onClick={() => {
            router.push(`Patient/moreInfo/${task._id}`)
          }}>More Info</DropdownMenuItem>
      { task.status =='In progress' &&
        (<DropdownMenuItem onClick={() => {
            router.push(`Patient/CompleteDossier/${task._id}`)
          }} >Complete Dossier</DropdownMenuItem>)}
        <DropdownMenuItem>Chat</DropdownMenuItem>
        {/* <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-white">
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem  onClick={handleDelete} disabled={loading} >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}