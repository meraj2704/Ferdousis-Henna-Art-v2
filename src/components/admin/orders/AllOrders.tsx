"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";
import { OrderI } from "@/types/Types";
import { useFetchData } from "@/hooks/useApi";
import { CiEdit } from "react-icons/ci";
import { useCookies } from "next-client-cookies";

export type Payment = {
  _id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};
export const columns: ColumnDef<OrderI>[] = [
  {
    accessorKey: "customerInformation.name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.customerInformation.name}</div>
    ),
  },
  {
    accessorKey: "customerInformation.phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.customerInformation.phone}</div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const total = row.original.totalAmount;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
      }).format(total);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as
        | "pending"
        | "delivered"
        | "canceled";
      const statusStyles: Record<"pending" | "delivered" | "canceled", string> =
        {
          pending: "bg-blue-200 text-blue-600",
          delivered: "bg-green-200 text-green-700",
          canceled: "bg-red-200 text-red-700",
        };

      return (
        <div className="flex justify-start items-center">
          <div
            className={`capitalize px-2 py-1 rounded ${
              statusStyles[status] || ""
            }`}
          >
            {status}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

      return (
        <Link href={`/admin/orders/${order._id}`}>
          <button className="bg-primary hover:bg-accent rounded-md p-2 text-white ">
            <CiEdit />
          </button>
        </Link>
      );
    },
  },
];

export function AllOrders() {
  const cookies = useCookies();
  const token = cookies.get("henna-token");
  const {
    isLoading,
    data = [],
    error,
  } = useFetchData(["orders"], "orders/all-orders", token);
  console.log("data", data);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const breadCrumbItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      label: "All Orders",
    },
  ];

  return (
    <div className="container mx-auto w-full md:px-3 space-y-4">
      <div className="pt-4">
        <DynamicBreadcrumb items={breadCrumbItems} />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium text-primary">All Orders</p>
        {/* <Link href={"/admin/products/add-product"}>
          <ButtonF>Add New Products</ButtonF>
        </Link> */}
      </div>
      <div className="flex items-center gap-10">
        <Input
          placeholder="Filter name..."
          value={
            (table
              .getColumn("customerInformation.name")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("customerInformation.name")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto hover:text-background border-accent"
            >
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border border-accent">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border border-accent">
        <Table className="rounded-md">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header?.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
