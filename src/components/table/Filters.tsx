// components/Filters.tsx
"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Dispatch, SetStateAction } from "react"

interface FiltersProps {
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  status: string
  setStatus: Dispatch<SetStateAction<string>>
}

export default function Filters({ email, setEmail, status, setStatus }: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {/* 이메일 검색 */}
      <Input
        placeholder="Search Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="max-w-sm"
      />

      {/* 상태 필터 */}
      <Select value={status} onValueChange={setStatus}>
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
    </div>
  )
}
