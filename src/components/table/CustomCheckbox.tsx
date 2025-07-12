import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CustomCheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export default function CustomCheckbox({
  id,
  label,
  checked,
  onCheckedChange,
}: CustomCheckboxProps) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
