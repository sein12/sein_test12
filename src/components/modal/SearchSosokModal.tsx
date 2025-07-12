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
import { ScrollArea } from "@/components/ui/scroll-area"; // ✅ 리스트에 스크롤 적용

export default function SearchSosokModal() {
  const [search, setSearch] = useState("");

  // ✅ 임시 리스트 데이터 (나중에 백엔드 연동 가능)
  const dataList = [
    "1사단",
    "2사단",
    "특전사",
    "해병대 제1사단",
    "해군작전사령부",
    "공군 제5비행단",
  ];

  // ✅ 필터링된 리스트
  const filteredList = dataList.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-7 sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>소속 부대 검색</DialogTitle>
            <DialogDescription>
              부대명을 검색하고 아래 리스트에서 선택하세요.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="budae">소속 부대</Label>
            <Input
              id="budae"
              className="placeholder:text-muted-foreground flex h-10 w-full bg-transparent py-3 text-sm  outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="예: 특전사"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[200px] border rounded-md p-2">
            <div className="flex flex-col gap-2">
              {filteredList.length > 0 ? (
                filteredList.map((item, index) => (
                  <>
                    <Button
                      key={index}
                      variant="ghost"
                      className="justify-start"
                      type="button"
                      onClick={() => {
                        alert(`"${item}" 선택됨`); // 나중에 선택값 전달하면 됨
                      }}
                    >
                      {item}
                    </Button>
                    <hr></hr>
                  </>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">결과 없음</p>
              )}
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
