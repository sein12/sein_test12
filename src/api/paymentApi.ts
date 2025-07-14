import axiosInstance from "./axiosInstance";

export const fetchPayments = async (
  filters: { email: string; status: string; minAmount: string },
  page: number,
) => {
  try {
    const response = await axiosInstance.get("/payments", {
      params: {
        email: filters.email,
        status: filters.status === "all" ? "" : filters.status,
        minAmount: filters.minAmount,
        page: page,
        pageSize: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};
