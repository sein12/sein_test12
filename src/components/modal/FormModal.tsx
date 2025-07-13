import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import CustomSelect from "./CustomSelect";
import { submitForm } from "@/api/formApi";
import SearchSosokModal from "./SearchSosokModal";

export default function FormModal() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    color: "",
    gubun: "",
    rank: "",
    sosok: "",
  });

  const handleSosokSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, sosok: value }));
  };

  const handleChange = (key: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "gubun" && { rank: "" }),
    }));
  };

  /*
  const handleSubmit = async () => {
    try {
      const data = await submitForm(formData);
      console.log("서버 응답:", data);
      alert("성공적으로 제출되었습니다!");
    } catch (error) {
      console.error("제출 실패:", error);
      alert("제출 중 오류 발생");
    }
  };
  */

  const handleSubmit = () => {
    console.log(JSON.stringify(formData, null, 2));
    alert("콘솔에서 JSON을 확인하세요!");
  };

  const rankOptionsMap: Record<string, { label: string; value: string }[]> = {
    gunin: [
      { label: "소령", value: "소령" },
      { label: "중령", value: "중령" },
      { label: "대령", value: "대령" },
    ],
    gongmuwon: [
      { label: "1급", value: "1급" },
      { label: "2급", value: "2급" },
      { label: "3급", value: "3급" },
    ],
  };

  const rankOptions = rankOptionsMap[formData.gubun] || [];

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>인적 정보 입력</DialogTitle>
            <DialogDescription>
              정보를 수정하세요. 저장을 누르면 반영됩니다.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6 p-6">
            {/* ✅ 이름 / 전화번호 */}
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={(e) => handleChange("name")(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  id="phone"
                  placeholder="전화번호를 입력하세요"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone")(e.target.value)}
                />
              </div>
            </div>

            {/* ✅ 공통 Select 컴포넌트 */}
            <CustomSelect
              label="좋아하는 색"
              value={formData.color}
              onChange={handleChange("color")}
              options={[
                { label: "빨강", value: "빨강" },
                { label: "파랑", value: "파랑" },
                { label: "초록", value: "초록" },
              ]}
            />
            <CustomSelect
              label="구분"
              value={formData.gubun}
              onChange={handleChange("gubun")}
              options={[
                { label: "군인", value: "gunin" },
                { label: "공무원", value: "gongmuwon" },
              ]}
            />
            <CustomSelect
              label="계급"
              value={formData.rank}
              onChange={handleChange("rank")}
              options={rankOptions}
              placeholder="구분 먼저 선택"
              disabled={!formData.gubun} // 구분이 선택되지 않았으면 비활성화
            />
            <div className="flex flex-col gap-2">
              <Label>소속 부대</Label>
              <div className="flex gap-1">
                <Input
                  disabled
                  value={formData.sosok}
                  readOnly
                  className="w-[200px]"
                  placeholder="부대 검색 클릭"
                />
                <SearchSosokModal onSelect={handleSosokSelect} />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
