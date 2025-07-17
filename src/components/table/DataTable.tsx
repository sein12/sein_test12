import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/api/formApi";
import type { todos } from "@/api/formApi";

interface Payment {
  id: string;
  email: string;
  amount: number;
  status: string;
}

interface TableProps {
  data: Payment[];
}

export default function Table({ data }: TableProps) {
  return (
    <div className="rounded-md border">
      <ShadcnTable>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </ShadcnTable>
    </div>
  );
}
