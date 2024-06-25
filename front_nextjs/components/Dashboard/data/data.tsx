import {
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react"
  
  // export const labels = [
  //   {
  //     value: "bug",
  //     label: "Bug",
  //   },
  //   {
  //     value: "feature",
  //     label: "Feature",
  //   },
  //   {
  //     value: "documentation",
  //     label: "Documentation",
  //   },
  // ]
  
  export const statuses = [
    {
      value: "Completed",
      label: "Completed",
      icon: QuestionMarkCircledIcon,
    },
    
    {
      value: "In progress",
      label: "In progress",
      icon: StopwatchIcon,
    },
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "Low",
      icon: ArrowDownIcon,
    },
    {
      label: "Medium",
      value: "Medium",
      icon: ArrowRightIcon,
    },
    {
      label: "High",
      value: "High",
      icon: ArrowUpIcon,
    },
  ]