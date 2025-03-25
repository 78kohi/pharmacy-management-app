/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClipboardCopy, Trash, Eye, MoreHorizontal, Pencil, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import DialogItem from "../DialogItem";
import MedicineCard from "../MedicineCard";
import { medicineApi } from "@/lib/api";
import { DialogClose } from "../ui/dialog";

const DropdownWithDialog = ({ batchNum, medicine }) => {

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
          <div className="flex flex-col items-center">
            <TriangleAlert className="h-8 w-8 text-red-600" />
            <h1 className="mt-2 text-xl font-bold">Delete &quot;{medicine.medicine}&quot;?</h1>
            <p className="text-center text-muted-foreground">Deleting this medicine will remove it from the database and cannot be undone.</p>
            <div className="flex justify-center gap-2 mt-2 min-w-xs">
              <DialogClose asChild>
                <Button variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button 
              variant="red"
              onClick={async () => {
                const toastId = toast.loading("Deleting Medicine...")
                try {
                  const response = await medicineApi.deleteMedicine(medicine._id);

                  if (response.error) {
                    toast.error(response.error, { id: toastId });
                    return
                  } else {
                    toast.success("Medicine deleted successfully", { id: toastId });
                    await new Promise((resolve) => setTimeout(resolve, 1500)).then(() => {
                      window.location.reload();
                    });
                  }
                } catch (err) {
                  toast.error(err.message || "Something went wrong", { id: toastId });
                }
              }}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownWithDialog;
