import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import React from "react";

export function SelectComp({
  data = [],
  checkIsChanged,
}: {
  data: any[];
  checkIsChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const defaultValue = data[0].value;
  const [selected, setSelected] = React.useState(defaultValue);
  console.log(selected, defaultValue);
  console.log(checkIsChanged);
  
  if (checkIsChanged) {
    if (selected != defaultValue) {
      console.log("here");
      
      checkIsChanged(true);
    } else {
      checkIsChanged(false);
    }
  }

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
