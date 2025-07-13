"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { Payment } from "./types";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    // 최소 금액 필터링을 위해 custom filterFn 지정
    filterFn: (row, columnId, filterValue) => {
      const amount = row.getValue<number>(columnId);
      return amount >= parseFloat(filterValue as string);
    },
    cell: ({ row }) => {
      const amt = parseFloat(row.getValue("amount"));
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amt);
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    // 날짜 포맷
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString();
    },
  },
];
