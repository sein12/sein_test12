// app/App.tsx or app/page.tsx
"use client"
import { useState } from "react"
import { columns } from "./Column"
import { DataTable } from "@/components/table/DataTable"
import Filters from "@/components/table/Filters"
import type { Payment } from "../components/table/types"

const mockData: Payment[] = [
  { id: "1", email: "test@example.com", amount: 100, status: "pending" },
  { id: "2", email: "abc@example.com", amount: 150, status: "success" },
  { id: "3", email: "xyz@example.com", amount: 200, status: "processing" },
]

export default function Page() {
  const [emailFilter, setEmailFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  return (
    <div className="container py-10">
      <Filters
        email={emailFilter}
        setEmail={setEmailFilter}
        status={statusFilter}
        setStatus={setStatusFilter}
      />
      <DataTable
        columns={columns}
        data={mockData}
        filters={{ email: emailFilter, status: statusFilter }}
      />
    </div>
  )
}
