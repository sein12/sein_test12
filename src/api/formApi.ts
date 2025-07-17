import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: { "Content-Type": "application/json" },
});

export interface todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// 결제 항목 타입
export interface Payment {
  id: string;
  email: string;
  amount: number;
  status: string;
}

// API 응답 타입
export interface FetchPaymentsResponse {
  content: Payment[]; // 실제 아이템 리스트
  totalPages: number; // 전체 페이지 수
  limit: number; // 페이지당 항목 수 (백엔드 기본)
  page: number; // 현재 페이지
}

export const fetchPayments = async (
  filters: { email: string; status: string; minAmount: string },
  page: number
): Promise<FetchPaymentsResponse> => {
  const params: any = {
    email: filters.email,
    status: filters.status === "all" ? undefined : filters.status,
    minAmount: filters.minAmount || undefined,
    page, // 넘길 건 page 번호만
    // pageSize: 백엔드 기본값 사용하므로 제거
  };

  try {
    const response = await axiosInstance.get<FetchPaymentsResponse>(
      "/payments",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};
