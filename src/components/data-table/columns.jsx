import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileDown, MoreHorizontal } from "lucide-react"
import { createColumnHelper } from "@tanstack/react-table";
import { format, parseISO, isWithinInterval } from "date-fns";
import { toast } from "sonner";
import { DataTableColumnHeader, DataTableStatusColumnHeader } from "./data-table-header";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const columnHelper = createColumnHelper();

/**
 * Columns configuration for the medicines data table.
 * @type {Array<Object>}
 */
export const medColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  columnHelper.accessor("batch", {
    header: "Batch Number",
    cell: (info) => <div className="capitalize">{info.getValue()}</div>,
  }),
  columnHelper.accessor("medicine", {
    header: ({ column }) => {
      return <DataTableColumnHeader title={"Medicine Name"} column={column} />;
    },
    cell: (info) => <div className="lowercase">{info.getValue()}</div>,
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => <div className="capitalize">{info.getValue()}</div>,
  }),
  columnHelper.accessor("purchaseDate", {
    header: "Purchase Date",
    cell: (info) => format(parseISO(info.getValue()), "PPP"),
    filterFn: (row, columnId, filterValue) => {
      const purchaseDate = parseISO(row.getValue(columnId));
      return isWithinInterval(purchaseDate, {
        start: filterValue.startDate,
        end: filterValue.endDate,
      });
    },
  }),
  columnHelper.accessor("expiryDate", {
    header: "Expiry Date",
    cell: (info) => format(parseISO(info.getValue()), "PPP"),
    filterFn: (row, columnId, filterValue) => {
      const expiryDate = parseISO(row.getValue(columnId));
      return isWithinInterval(expiryDate, {
        start: filterValue.startDate,
        end: filterValue.endDate,
      });
    },
  }),
  columnHelper.accessor("quantity", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Quantity"} />
    ),
    cell: (info) => <div className="capitalize">{info.getValue()}</div>,
  }),
  columnHelper.accessor("unitPrice", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Unit Price"} />
    ),
    cell: (info) => {
      const amount = parseFloat(info.getValue());

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => {
      return <DataTableStatusColumnHeader column={column} />;
    },
    cell: (info) => {
      const status = info.getValue();
      const bgColor =
        status === "in stock"
          ? "bg-green-200 text-green-600"
          : status === "low stock"
          ? "bg-yellow-200 text-yellow-600"
          : status === "expiring"
          ? "bg-orange-200 text-orange-600"
          : "bg-red-200 text-red-600";

      return (
        <div className="text-right">
          <div
            className={`inline-flex items-center px-2 capitalize font-medium rounded ${bgColor}`}
          >
            <svg className="h-3 w-3 fill-current mr-1" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" />
            </svg>
            {status}
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  {
    id: "actions",
    enableHiding: false,
    header: () => {
      return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <FileDown className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Export to csv</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>)
    },
    cell: ({ row }) => {
      const batchNum = row.original.batch;

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
              Copy batch number
            </DropdownMenuItem>
            <DropdownMenuItem>View medicine</DropdownMenuItem>
            <DropdownMenuItem>Edit medicine</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];