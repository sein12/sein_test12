import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Category 타입 정의
type Category =
  | "bunri"
  | "left2"
  | "right2"
  | "left3"
  | "right3"
  | "shower"
  | "dryer_left"
  | "dryer_right"
  | "cheongppa";

type Person = string;

const PEOPLE: Person[] = [
  "박지환",
  "최성민",
  "임성재",
  "김도헌",
  "류제경",
  "방효정",
  "이승섭",
  "박민성",
  "박상민",
  "박준영",
  "윤건우",
  "이승윤",
  "조현성",
];

// 1차 Select: 카테고리
const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: "bunri", label: "분리" },
  { value: "left2", label: "좌화2" },
  { value: "right2", label: "우화2" },
  { value: "left3", label: "좌화3" },
  { value: "right3", label: "우화3" },
  { value: "shower", label: "샤워장" },
  { value: "dryer_left", label: "좌건조기" },
  { value: "dryer_right", label: "우건조기" },
  { value: "cheongppa", label: "청빠" },
];

// 2차 Select: 카테고리별 옵션
const ITEM_OPTIONS: Record<Category, { value: string; label: string }[]> = {
  bunri: [
    { value: "1", label: "1번" },
    { value: "2", label: "2번" },
    { value: "3", label: "3번" },
    { value: "4", label: "4번" },
    { value: "5", label: "5번" },
    { value: "6", label: "6번" },
  ],
  left2: [
    { value: "최선임", label: "최선임" },
    { value: "차선임", label: "차선임" },
    { value: "차막내", label: "차막내" },
    { value: "막내", label: "막내" },
  ],
  right2: [
    { value: "최선임", label: "최선임" },
    { value: "차선임", label: "차선임" },
    { value: "차막내", label: "차막내" },
    { value: "막내", label: "막내" },
  ],
  left3: [
    { value: "최선임", label: "최선임" },
    { value: "차선임", label: "차선임" },
    { value: "차막내", label: "차막내" },
    { value: "막내", label: "막내" },
  ],
  right3: [
    { value: "최선임", label: "최선임" },
    { value: "차선임", label: "차선임" },
    { value: "차막내", label: "차막내" },
    { value: "막내", label: "막내" },
  ],
  shower: [
    { value: "최선임", label: "최선임" },
    { value: "차선임", label: "차선임" },
    { value: "차막내", label: "차막내" },
    { value: "막내", label: "막내" },
  ],
  dryer_left: [], // 아직 지정 없으면 비워두기
  dryer_right: [],
  cheongppa: [],
};

type Selection = {
  category?: Category;
  item?: string;
};

export default function PeopleSelector() {
  // 사람별 선택 상태
  const [selections, setSelections] = useState<Record<Person, Selection>>(() =>
    PEOPLE.reduce((acc, p) => {
      acc[p] = {};
      return acc;
    }, {} as Record<Person, Selection>)
  );

  // 출력용 텍스트
  const [resultLines, setResultLines] = useState<string[]>([]);

  const requiresItem = (cat: Category) => ITEM_OPTIONS[cat].length > 0;

  const isCompleteForAll = useMemo(() => {
    return PEOPLE.every((p) => {
      const sel = selections[p];
      if (!sel.category) return false; // 카테고리는 필수
      return requiresItem(sel.category) ? !!sel.item : true; // 2차 옵션 필요 시에만 item 필수
    });
  }, [selections]);

  const handleCategoryChange = (person: Person, category: Category) => {
    setSelections((prev) => ({
      ...prev,
      [person]: {
        category,
        // 카테고리 바뀌면 2차 선택은 초기화
        item: undefined,
      },
    }));
  };

  const handleItemChange = (person: Person, itemValue: string) => {
    setSelections((prev) => ({
      ...prev,
      [person]: {
        ...prev[person],
        item: itemValue,
      },
    }));
  };

  const handleDone = () => {
    const lines = PEOPLE.map((p) => {
      const sel = selections[p];
      const catLabel =
        CATEGORY_OPTIONS.find((c) => c.value === sel.category)?.label ?? "-";

      if (!sel.category) return `${p}: -`;

      // 2차 옵션이 있는 경우
      if (ITEM_OPTIONS[sel.category].length > 0) {
        const itemLabel =
          ITEM_OPTIONS[sel.category].find((i) => i.value === sel.item)?.label ??
          "-";
        return `${p}: ${catLabel} → ${itemLabel}`;
      }

      // 2차 옵션이 없는 경우
      return `${p}: ${catLabel}`;
    });
    setResultLines(lines);
  };

  return (
    <div className="mx-auto min-w-xl space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>청소판</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {PEOPLE.map((person) => {
            const sel = selections[person];

            return (
              <div key={person} className="grid grid-cols-3 gap-2 items-center">
                <div className="font-medium">{person}</div>

                {/* 1차 Select: 카테고리 */}
                <Select
                  value={sel.category}
                  onValueChange={(v) =>
                    handleCategoryChange(person, v as Category)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* 2차 Select: 카테고리에 따른 아이템 */}
                {sel.category && ITEM_OPTIONS[sel.category].length > 0 && (
                  <Select
                    value={sel.item}
                    onValueChange={(v) => handleItemChange(person, v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      {ITEM_OPTIONS[sel.category].map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            );
          })}

          <div className="pt-2">
            <Button onClick={handleDone} disabled={!isCompleteForAll}>
              완료
            </Button>
            {!isCompleteForAll && (
              <p className="mt-2 text-sm text-muted-foreground">
                모든 사람의 청소 구역을 선택하세요.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {resultLines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>결과</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">
              {resultLines.join("\n")}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
