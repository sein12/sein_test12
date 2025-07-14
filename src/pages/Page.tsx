import { useState, useEffect } from "react";
import { fetchPayments } from "@/api/paymentApi";
import Table from "@/components/table/DataTable";
import PaginationComponent from "@/components/table/Pagination";
import Filters from "@/components/table/Filters";

interface Payment {
  id: string;
  email: string;
  amount: number;
  status: string;
}

export default function Page() {
  const [data, setData] = useState<Payment[]>([]);
  const [filters, setFilters] = useState({
    email: "",
    status: "all",
    minAmount: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // 필터나 페이지가 바뀔 때마다 API 호출
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchPayments(filters, page);
        setData(result.items);
        setTotalPages(result.totalPages);
      } catch (error) {
        // 에러 처리 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, page]);

  const handleFiltersChange = (name: string, value: string) => {
    setPage(1); // 필터 변경 시 페이지 초기화
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl px-4 pt-20">
        <div className="flex flex-row items-center justify-between my-4">
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
