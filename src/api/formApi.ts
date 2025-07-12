// src/api/formApi.ts
import axiosInstance from "./axiosInstance";

export const submitForm = async (formData: any) => {
  const response = await axiosInstance.post("/submit", formData);
  return response.data;
};
