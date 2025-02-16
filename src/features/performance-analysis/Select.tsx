import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import React from "react";

export function SelectComp({ data = [] }: { data: any[] }) {
  const [selected, setSelected] = React.useState(data[0].value);
  return (
    <Select name="Country" value={selected} onValueChange={setSelected}>
      <SelectTrigger className="w-24 rounded-[4px] h-8 text-black/60 text-sm font-normal">
        <SelectValue
          placeholder="how many calls"
          className="text-black/60 text-sm"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="text-black/60 text-sm">
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectComp;
