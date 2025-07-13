import { useState } from "react";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import Filters from "@/components/table/Filters";
import { mockData } from "./mockData";
import type { ColumnFiltersState } from "@tanstack/react-table";
import FormModal from "../components/modal/FormModal";

export default function Page() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl px-4 pt-20">
        <div className="flex flex-row items-center justify-between my-4">
          <Filters
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
          />
          <FormModal />
        </div>

        <DataTable
          columns={columns}
          data={mockData}
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
        />
      </div>
    </div>
  );
}
