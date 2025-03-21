import React, { useMemo } from "react";
import { ComboBox } from "@/components/combo-box";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { salesColumns } from "@/components/data-table/columns";
import { Toaster } from "@/components/ui/sonner";
import { CalendarDatePicker } from "@/components/calendar-date-picker";
import { FilterX } from "lucide-react";
import { useSales } from "@/hooks/use-sales";
import { Input } from "@/components/ui/input";

const Sales = () => {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [dateRange, setDateRange] = React.useState({});
  const [search, setSearch] = React.useState("");
  const { editInvoice, invoices: data } = useSales();
  const columns = useMemo(() =>
    salesColumns({ editInvoice }),
    [editInvoice]
  )
  console.log(data)

  const handleDateSelect = ({ from, to }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table
      .getColumn("purchaseDate")
      ?.setFilterValue({ startDate: from, endDate: to });
    table
      .getColumn("expiryDate")
      ?.setFilterValue({ startDate: from, endDate: to });
  };

  const clearFilters = () => {
    setDateRange({});
    table.resetColumnFilters();
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const handleSearchInvoice = (e) => {
    const invoiceId = e.target.value;
    setSearch(invoiceId);
    table.getColumn("invoiceId")?.setFilterValue(invoiceId);
  }

  return (
    <section className="py-2 px-4 bg-[#F6F6F6] h-full">
      <h1 className="text-2xl font-medium mb-4">Sales Information</h1>
      <div className="flex justify-between items-end">
        <div className="flex gap-4 items-end">
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Customer</p>
            <ComboBox table={table} />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Invoice ID</p>
            <Input 
              placeholder="20251015001" 
              className="bg-background"
              value={search}
              onChange={handleSearchInvoice}
            />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500">Date Range</h5>
            <CalendarDatePicker
              date={dateRange}
              onDateSelect={handleDateSelect}
              table={table}
              className="h-9 w-[250px]"
              variant="outline"
            />
          </div>
          {columnFilters.length ? (
            <Button
              variant="outline"
              size="sm"
              className={
                "h-9 transition hover:bg-primary/90 hover:text-background"
              }
              onClick={() => clearFilters()}
            >
              <FilterX />
              Reset Filters
            </Button>
          ) : null}
        </div>
        <Link to={"new-medicine"}>
          <Button>Add Medicine</Button>
        </Link>
      </div>
      <DataTable table={table} />
      <Toaster richColors />
    </section>
  );
};

export default Sales;
