"use client"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckboxDemo() {
  // 체크박스 상태
  const [checkedItems, setCheckedItems] = useState({
    snack: false,
    food: false,
    chicken: false,
  })

  // 인풋 상태 (예: 이름 입력)
  const [name, setName] = useState("")

  // 드롭다운 상태 (예: 색상 선택)
  const [color, setColor] = useState("")

  // 체크박스 변경 핸들러
  const handleCheckedChange = (key: keyof typeof checkedItems) => (checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: checked,
    }))
  }

  // 제출 버튼 핸들러
  const handleSubmit = () => {
    const selectedItems = Object.entries(checkedItems)
      .filter(([, checked]) => checked)
      .map(([key]) => key)

    const jsonData = JSON.stringify(
      {
        name,
        favoriteColor: color,
        selectedItems,
      },
      null,
      2
    )

    console.log(jsonData)
    alert("콘솔에서 JSON을 확인하세요!")
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* ✅ 이름 입력 */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* ✅ 드롭다운: 좋아하는 색 */}
      <div className="flex flex-col gap-2">
        <Label>좋아하는 색</Label>
        <Select onValueChange={(value) => setColor(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="색을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="빨강">빨강</SelectItem>
            <SelectItem value="파랑">파랑</SelectItem>
            <SelectItem value="초록">초록</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ✅ 체크박스: 항목 선택 */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Checkbox id="snack" checked={checkedItems.snack} onCheckedChange={handleCheckedChange("snack")} />
          <Label htmlFor="snack">과자</Label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="food" checked={checkedItems.food} onCheckedChange={handleCheckedChange("food")} />
          <div className="grid gap-2">
            <Label htmlFor="food">음식</Label>
            <p className="text-muted-foreground text-sm">
              By clicking this checkbox, you agree to the terms and conditions.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="chicken" checked={checkedItems.chicken} onCheckedChange={handleCheckedChange("chicken")} />
          <Label htmlFor="chicken">치킨</Label>
        </div>
      </div>

      {/* ✅ 제출 버튼 */}
      <Button className="w-fit" onClick={handleSubmit}>
        선택한 항목 확인
      </Button>
    </div>
  )
}
