import { useState, useEffect } from "react";
import { fetchPayments, axiosInstance } from "@/api/formApi";
import type { Payment, todos } from "@/api/formApi";

import Table from "@/components/table/DataTable";
import PaginationComponent from "@/components/table/Pagination";
import Filters from "@/components/table/Filters";

export default function Page() {
  const fetchItems = async () => {
    const response = await axiosInstance.get<todos>("/todos");
    console.log(response.data);
    return response.data;
  };

  const [data, setData] = useState<Payment[]>([]);
  const [filters, setFilters] = useState({
    email: "",
    status: "all",
    minAmount: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchItems();
        console.log(result);
      } finally {
        setLoading(false);
      }
    })();
  }, [filters, page]);

  const handleFiltersChange = (name: keyof typeof filters, value: string) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl px-4 pt-20">
        <div className="flex justify-between my-4">
          <Filters filters={filters} onFiltersChange={handleFiltersChange} />
        </div>

        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <Table data={data} />
        )}

        <PaginationComponent
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
