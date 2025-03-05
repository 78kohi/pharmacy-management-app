/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ArrowUpDown, CheckIcon, ListFilter, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../ui/command";

export function DataTableColumnHeader({ column, title, className }) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger className={'gap-1'} asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-1 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-1 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-1 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              column.toggleSorting(true)
            }
          >
            <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              column.clearSorting()
            }
          >
            <X className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Clear sort
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const statuses = [
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
]

export const DataTableStatusColumnHeader = ({ column, className }) => {
  const facets = column?.getFacetedUniqueValues(); 
  const selectedValues = new Set(column?.getFilterValue()); 

  return (
    <div className={cn("flex items-center justify-end space-x-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            Status
            <ListFilter />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={"Status"} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => {
                  const isSelected = selectedValues.has(status.value);
                  const bgColor =
                    status.value === "in stock"
                      ? "bg-green-200 text-green-600"
                      : status.value === "low stock"
                      ? "bg-yellow-200 text-yellow-600"
                      : status.value === "expiring"
                      ? "bg-orange-200 text-orange-600"
                      : "bg-red-200 text-red-600";
                  return (
                    <CommandItem
                      key={status.value}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(status.value);
                        } else {
                          selectedValues.add(status.value);
                        }
                        const filterValues = Array.from(selectedValues);
                        column?.setFilterValue(
                          filterValues.length ? filterValues : undefined
                        );
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className={cn("h-4 w-4")} />
                      </div>
                      {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span
                        className={`inline-flex items-center px-2 capitalize font-medium rounded ${bgColor}`}
                      >
                        <svg
                          className={`h-3 w-3 fill-current mr-1`}
                          viewBox="0 0 100 100"
                        >
                          <circle cx="50" cy="50" r="40" />
                        </svg>
                        {status.label}
                      </span>
                      {facets?.get(status.value) && (
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          {facets.get(status.value)}
                        </span>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => column?.setFilterValue(undefined)}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
