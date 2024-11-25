"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getAllPhotos } from "@/api/api";
import Image from "next/image";
import ButtonF from "@/components/customUi/ButtonF";
import Link from "next/link";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { setModalData, setModalOpen } from "@/redux/Reducer/modalSlice";
import { RootState } from "@/redux/Store/store";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

export const columns: ColumnDef<Product>[] = [
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
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.getValue("imageUrl")}
        alt="product image"
        width={100}
        height={100}
        priority
        className="w-12 h-12 object-cover rounded"
      />
    ),
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      const data = row.original;
      const dispatch = useDispatch();
      return (
        <ButtonF onClick={() => dispatch(setModalData(data))}>View</ButtonF>
      );
    },
  },
];

export function AllPhotos() {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["allPhotos"],
    queryFn: getAllPhotos,
  });
  const dispatch = useDispatch();
  const photoData = useSelector((state: RootState) => state.modal);

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
      label: "All Photos",
    },
  ];

  return (
    <div className="container mx-auto w-full md:px-3 space-y-4">
      <div className="pt-4">
        <DynamicBreadcrumb items={breadCrumbItems} />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium text-primary">All Photos</p>
        <Link href={"/admin/products/add-product"}>
          <ButtonF>Add New Photo</ButtonF>
        </Link>
      </div>
      <div className="flex items-center gap-10">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
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
      <Dialog
        open={photoData.isOpen}
        onOpenChange={() => dispatch(setModalOpen())}
      >
        <DialogContent className="w-[80%] bg-white rounded-lg p-8 shadow-lg">
          <DialogHeader className="text-center mb-4">
            <DialogTitle className="text-2xl font-semibold text-primary">
              {photoData?.data?.name}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 mt-2">
              <Image
                src={photoData?.data?.imageUrl}
                alt="photo image"
                width={200}
                height={200}
                className="w-full h-full rounded-md object-cover"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <Button
              onClick={() => dispatch(setModalOpen())}
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-secondary transition duration-300"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
