import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Table, TableBody, TableHeader, TableRow, TableCell } from '../ui/table'

const TableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>
            <Skeleton className="w-full h-9 mt-6" />
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }, (_, i) => {
        return (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>)
        }) 
        }
      </TableBody>
    </Table>
  )
}

export default TableSkeleton