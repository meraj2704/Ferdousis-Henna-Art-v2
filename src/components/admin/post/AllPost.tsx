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
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import Image from "next/image";
import ButtonF from "@/components/customUi/ButtonF";
import Link from "next/link";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";
import DynamicAlertDialogue from "@/components/share/DynamicAlertDialogue";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import Loader from "@/components/share/Loader";
import { PostI } from "@/types/Types";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export const columns: ColumnDef<PostI>[] = [
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "buttonName",
    header: "Button Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("buttonName")}</div>
    ),
  },

  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.getValue("image")}
        alt="product image"
        width={100}
        height={100}
        priority
        className="w-12 h-12 object-cover rounded"
      />
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;
      const deletePost = useDeleteData(["allPosts"], `hero-post/post-delete`);
      const handleDelete = (id: string) => {
        deletePost.mutate(id, {
          onSuccess: () => {
            toast.success("Post deleted successfully!");
            // router.push("/admin/post/all-posts");
          },
          onError: () => {
            toast.error("Failed to delete Post!");
          },
        });
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/admin/post/${post._id}`}>
              <DropdownMenuItem>View</DropdownMenuItem>
            </Link>
            <Link href={`/admin/post/edit/${post._id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem asChild>
              <DynamicAlertDialogue
                triggerText="Delete"
                triggerClass="w-full text-sm rounded-sm text-left pl-2 py-1 hover:bg-accent hover:text-textLight"
                title={`Are sure yor want to delete ?`}
                content="This action cannot be undone. This will permanently delete your
            product and remove your product data from our servers."
                onAction={() => handleDelete(post._id)}
                cancelText="Cancel"
                actionText="Delete"
                actionButtonClass={"bg-red-700 hover:bg-red-500 text-white"}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function AllPosts() {
  const {
    data = [],
    isLoading,
    error,
  } = useFetchData(["allPosts"], `hero-post/get-all-posts`);
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
      label: "All Products",
    },
  ];

  return (
    <div className="container mx-auto w-full md:px-3 space-y-4">
      <div className="pt-4">
        <DynamicBreadcrumb items={breadCrumbItems} />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium text-primary">All Hero Posts</p>
        <Link href={"/admin/post/add-post"}>
          <ButtonF>Add New Post</ButtonF>
        </Link>
      </div>
      {isLoading ? (
        <>
          <div className="container mx-auto w-full flex flex-col items-center justify-between gap-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-10 rounded-xl" />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-10">
            <Input
              placeholder="Filter title..."
              value={
                (table.getColumn("type")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("type")?.setFilterValue(event.target.value)
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
         <div className="rounded-md border border-accent">
        <Table className="rounded-md">
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
        </>
      )}
    </div>
  );
}
