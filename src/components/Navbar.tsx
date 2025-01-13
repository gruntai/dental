import React from "react";
import { Button } from "./ui/button";
import { Link, PlayCircle, Trash2 } from "lucide-react";
import { Switch } from "./ui/switch";

function Navbar() {
  return (
    <nav className="md:h-16 flex flex-col-reverse md:flex-row items-start md:items-center gap-4 px-5 mb-10 md:mb-5 md:justify-end pt-5 md:pt-0">
      <span className="opacity-70">Last run: 5 Jun,14:53</span>
      <div className="flex flex-wrap gap-5 items-center">
        {/* dividor */}
        <div className="w-0.5 h-5 bg-slate-200 hidden md:block"></div>
        <Button
          variant={"outline"}
          className="border rounded-md px-2 py-1 flex items-center gap-2"
        >
          <PlayCircle className="text-blue-400 w-5 h-5" />
          <span>Run now </span>
        </Button>
        <div className="border rounded-md px-2 py-1 flex items-center gap-2">
          <Switch
            className="h-5 w-9 data-[state=checked]:bg-green-600"
            thumbClassName="w-4 h-4 data-[state=checked]:translate-x-4"
            //   checked={field.value} onCheckedChange={field.onChange}
          />
          <span>Enabled</span>
        </div>

        <Button
          variant={"outline"}
          size={"icon"}
          className="border-slate-200 w-8 h-8"
        >
          <Link className="text-blue-400" strokeWidth={3} />
        </Button>
        {/* dividor */}
        <div className="w-0.5 h-5 bg-slate-200"></div>
        <Button
          variant={"outline"}
          size={"icon"}
          className="border-red-400 w-8 h-8"
        >
          <Trash2 className="text-red-400" strokeWidth={3} />
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
