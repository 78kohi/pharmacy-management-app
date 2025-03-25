import { ComboBox } from '@/components/combo-box'
import { DataTable } from '@/components/data-table/data-table'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link, useNavigate, useSearchParams,  } from 'react-router'

import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { medColumns as columns } from '@/components/data-table/columns' 
import { Toaster } from '@/components/ui/sonner'
import { CalendarDatePicker } from '@/components/calendar-date-picker'
import { FilterX, Plus } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { medicineApi } from '@/lib/api'
import { toast } from 'sonner'
import TableSkeleton from '@/components/skeleton/TableSkeleton'
import NewMedicine from '@/components/NewMedicine'

/**
 * Inventory component that displays the inventory of medicines.
 * Includes filters for medicine name and date range, and a table to display the data.
 * @returns {JSX.Element}
 */
const Inventory = () => {
  const [data, setData] = React.useState([])
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [dateRange, setDateRange] = React.useState({});

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  React.useEffect(() => {
    loadMedicine();
  }, [])
  const loadMedicine = async () => {
    try {
      setLoading(true)
      const data = await medicineApi.getAllMedicines();
      setData(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const newMedicine = searchParams.get("new-medicine");

  const handleDateSelect = ({ from, to }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn("purchaseDate")?.setFilterValue({ startDate: from, endDate: to });
    table.getColumn("expiryDate")?.setFilterValue({ startDate: from, endDate: to });
  };

  const clearFilters = () => {
    setDateRange({});
    table.resetColumnFilters()
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

  if(error) return toast.error(error)
  if(data.length) console.log(data)

  return (
    <section className="py-2 px-4 bg-[#F6F6F6] h-full">
      <h1 className="text-2xl font-medium mb-4">Inventory</h1>
      <div className="flex justify-between items-end">
        <div className="flex gap-4 items-end">
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Medicine Name</p>
            <ComboBox table={table} />
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
          {columnFilters.length ? <Button
            variant="outline"
            size="sm"
            className={"h-9 transition hover:bg-primary/90 hover:text-background"}
            onClick={() => clearFilters()}
          >
            <FilterX />
            Reset Filters
          </Button> : null}
        </div>
        <Link to={"?new-medicine=true"}>
        <Button variant="green" className="cursor-pointer">
          <Plus />
          New Medicine
        </Button>
        </Link>
      </div>
      <Dialog open={newMedicine}>
        <DialogContent onInteractOutside={() => navigate('/inventory')} onClose={() => navigate('/inventory')}>
          <NewMedicine />
        </DialogContent>
      </Dialog>
      {loading ? <TableSkeleton /> : <DataTable table={table} />}
      <Toaster richColors />
    </section>
  )
}

export default Inventory