/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClipboardCopy, Trash, Eye, MoreHorizontal, Pencil } from "lucide-react";
import { toast } from "sonner";
import DialogItem from "../DialogItem";
import MedicineCard from "../MedicineCard";

const DropdownWithDialog = ({ batchNum, medicine }) => {
  console.log(medicine)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            toast.success("Copied to clipboard!");
            navigator.clipboard.writeText(batchNum);
          }}
        >
          <ClipboardCopy className="h-4 w-4 text-gray-500 hover:text-gray-700" />
          Copy batch number
        </DropdownMenuItem>
        <DialogItem 
          triggerIcon={<Eye className="h-4 w-4 text-gray-500 hover:text-gray-700" />} 
          triggerclassName="flex gap-2 items-center" 
          triggerChildren="View medicine"
        >
          <MedicineCard {...medicine} />
        </DialogItem>
        <DialogItem 
          triggerIcon={<Pencil className="h-4 w-4 text-gray-500 hover:text-gray-700" />} 
          triggerclassName="flex gap-2 items-center" 
          triggerChildren="Edit medicine"
        >
          <MedicineCard editable {...medicine} />
        </DialogItem>
        <DialogItem 
          triggerIcon={<Trash className="h-4 w-4 text-red-600 hover:text-red-700" />} 
          triggerClassName="flex gap-2 items-center text-red-600 hover:text-red-700" 
          triggerChildren="Delete medicine"
        >
          <MedicineCard />
        </DialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownWithDialog;
