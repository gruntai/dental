import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SwitchComp() {
  return (
    <Switch
      id="airplane-mode"
      className="h-7 w-12 data-[state=checked]:bg-[#0052ff] "
      thumbClasses={"data-[state=checked]:translate-x-5  h-6 w-6 "}
    />
  );
}
