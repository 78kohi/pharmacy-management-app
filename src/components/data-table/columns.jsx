import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, FileDown, MoreHorizontal, Printer, SquarePen } from "lucide-react"
import { createColumnHelper } from "@tanstack/react-table";
import { format, parseISO, isWithinInterval } from "date-fns";
import { toast } from "sonner";
import { DataTableColumnHeader, DataTableStatusColumnHeader } from "./data-table-header";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Invoice from "../Invoice";

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
const medStatus = [
        {
          value: "in stock",
          label: "In Stock",
        },
        {
          value: "low stock",
          label: "Low Stock",
        },
        {
          value: "expiring",
          label: "Expiring",
        },
        {
          value: "expired",
          label: "Expired",
        },
      ];
      return <DataTableStatusColumnHeader column={column} statuses={medStatus} />;
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
            <DropdownMenuItem>View medicine            </DropdownMenuItem>
            <DropdownMenuItem>Edit medicine</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const salesColumns = ({ editInvoice }) => [
  columnHelper.accessor("invoiceId", {
    header: "Invoice ID",
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => format(info.getValue(), "PPP"),
    filterFn: (row, columnId, filterValue) => {
      const purchaseDate = parseISO(row.getValue(columnId));
      return isWithinInterval(purchaseDate, {
        start: filterValue.startDate,
        end: filterValue.endDate,
      });
    },
  }),
  columnHelper.accessor("customer", {
    header: "Customer",
    cell: (info) => <div className="capitalize">{info.getValue()}</div>,
  }),
  columnHelper.accessor("netTotal", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Net Total"} />
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
  columnHelper.accessor("paidAmount", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Paid Amount"} />
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
  columnHelper.accessor("change", {
    header: "Change",
    cell: ({ row }) => {
      const isPaid = parseFloat(row.original.paidAmount) >= parseFloat(row.original.netTotal);
      const change = isPaid ? 
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(parseFloat(row.original.paidAmount) - parseFloat(row.original.netTotal)) :
        "not paid";
      return <div className="font-medium capitalize">{change}</div>;
    },
  }),
  columnHelper.accessor("paymentType", {
    header: "Payment Type",
    cell: (info) => <div className="capitalize">{info.getValue()}</div>
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => {
      const salesStatus = [
        {
          value: "in stock",
          label: "In Stock",
        },
        {
          value: "low stock",
          label: "Low Stock",
        },
        {
          value: "expiring",
          label: "Expiring",
        },
      ];
      return (
        <DataTableStatusColumnHeader column={column} statuses={salesStatus} />
      );
    },
    cell: (info) => {
      const status = info.getValue();
      const bgColor =
        status === "paid"
          ? "bg-green-200 text-green-600"
          : status === "pending"
          ? "bg-yellow-200 text-yellow-600"
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
    id: "action",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const invoice = row.original

      const handleSave = (updatedData) => {
        console.log(updatedData, updatedData.medicines, updatedData.change)
        if (!updatedData.customer || !updatedData.paymentType) {
        toast.error("Please fill in all required fields");
        return;
        }

        editInvoice(invoice.invoiceId, updatedData);
        toast.success("Invoice updated successfully!")
      }

      return (
        <div className="flex gap-1.5 justify-end">
          <Dialog>
            <DialogTrigger className="grid place-items-center bg-accent h-5 w-5 rounded">
              <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </DialogTrigger>
            <DialogContent>
              <Invoice 
                {...invoice}
              />
            </DialogContent>
            <DialogContent>
              <Invoice 
                {...invoice}
              />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className="grid place-items-center bg-accent h-5 w-5 rounded">
              <SquarePen className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </DialogTrigger>
            <DialogContent>
              <Invoice 
                {...invoice}
                editable
                onSave={handleSave} />
            </DialogContent>
          </Dialog>
          <div className="grid place-items-center bg-accent h-5 w-5 rounded">
            <Printer className="h-4 w-4 text-gray-500 hover:text-gray-700" />
          </div>
        </div>
      );
    }
  }
];