import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  filters: {
    email: string;
    status: string;
    minAmount: string;
  };
  onFiltersChange: (name: keyof FiltersProps["filters"], value: string) => void;
}

export default function Filters({
  filters,
  onFiltersChange,
}: FiltersProps) {
  return (
    <div className="flex flex-row items-center gap-4">
      <Input
        placeholder="Search Email..."
        value={filters.email}
        onChange={(e) => onFiltersChange("email", e.target.value)}
        className="max-w-sm"
      />

      <Select
        value={filters.status}
        onValueChange={(val) => onFiltersChange("status", val)}
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
        value={filters.minAmount}
        onChange={(e) => onFiltersChange("minAmount", e.target.value)}
        className="w-32"
      />
    </div>
  );
}
