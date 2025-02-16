import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import React from "react";

const softwareList = [
  { id: 1, label: "Dentrix Ascend", value: "dentrix-ascend" },
  { id: 2, label: "Eaglesoft Cloud", value: "eaglesoft-cloud" },
  { id: 3, label: "Open Dental Cloud", value: "open-dental-cloud" },
  { id: 4, label: "CareStack", value: "carestack" },
  { id: 5, label: "Tab32", value: "tab32" },
  { id: 6, label: "DentiMax Cloud", value: "dentimax-cloud" },
  { id: 7, label: "Curve Dental", value: "curve-dental" },
  { id: 8, label: "Dentrix", value: "dentrix" },
  { id: 9, label: "Eaglesoft", value: "eaglesoft" },
  { id: 10, label: "Open Dental", value: "open-dental" },
  { id: 11, label: "DentiMax", value: "dentimax" },
  { id: 12, label: "SoftDent", value: "softdent" },
  { id: 13, label: "PracticeWorks", value: "practiceworks" },
  { id: 14, label: "OrthoTrac", value: "orthotrac" },
  { id: 15, label: "ABELDent", value: "abeldent" },
  { id: 16, label: "MOGO Cloud", value: "mogo-cloud" },
  { id: 17, label: "axiUm", value: "axium" },
  { id: 18, label: "Fuse", value: "fuse" },
  { id: 19, label: "MacPractice DDS", value: "macpractice-dds" },
  { id: 20, label: "Dovetail", value: "dovetail" },
];

export function SelectComp() {
  const [software, setSoftware] = React.useState(softwareList[0].value);
  return (
    <Select name="Country" value={software} onValueChange={setSoftware}>
      <SelectTrigger className=" max-w-60 rounded-[4px] h-8 text-black/60 border-black/35 text-sm font-normal">
        <SelectValue
          placeholder="how many calls"
          className="text-black/60 text-sm"
        />
      </SelectTrigger>
      <SelectContent className="h-56">
        <SelectGroup className="text-black/60 text-sm">
          {softwareList.map((item) => (
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
