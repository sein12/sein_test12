// components/Filters.tsx
"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ColumnFiltersState, ColumnFilter } from "@tanstack/react-table";

interface FiltersProps {
  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: (filters: ColumnFiltersState) => void;
}

export default function Filters({
  columnFilters,
  onColumnFiltersChange,
}: FiltersProps) {
  const emailFilter =
    (columnFilters.find((f) => f.id === "email")?.value as string) || "";
  const statusFilter =
    (columnFilters.find((f) => f.id === "status")?.value as string) || "all";
  const minAmtVal =
    (columnFilters.find((f) => f.id === "amount")?.value as string) || "";

  const updateFilter = (id: string, value: string) => {
    const next = columnFilters.filter((f) => f.id !== id);
    if (value && !(id === "status" && value === "all")) {
      next.push({ id, value });
    }
    onColumnFiltersChange(next);
  };

  return (
    <div className="flex flex-row items-center gap-4">
      {/* 이메일 검색 */}
      <Input
        placeholder="Search Email..."
        value={emailFilter}
        onChange={(e) => updateFilter("email", e.target.value)}
        className="max-w-sm"
      />

      {/* 상태 필터 */}
      <Select
        value={statusFilter}
        onValueChange={(val) => updateFilter("status", val)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="success">Success</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Min Amount"
        value={minAmtVal}
        onChange={(e) => updateFilter("amount", e.target.value)}
        className="w-32"
      />
    </div>
  );
}
