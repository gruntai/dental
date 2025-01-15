import React from "react";
import { Button } from "./ui/button";
import { Link, Menu, PlayCircle, Trash2 } from "lucide-react";
import { Switch } from "./ui/switch";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="bg-white md:h-16 fixed left-0 top-0 z-50 w-full flex items-center justify-between px-5 py-3  shadow-md shadow-black/5">
      <Image
        src="/assets/images/logos/grunt_logo.png"
        alt="grunt logo"
        width={150}
        height={30}
        className="pl-5"
      />
      <div className="flex  items-start md:items-center gap-4 px-5 md:justify-end">
        <div className="flex flex-wrap gap-5 items-center">
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
          {/* dividor */}
          <div className="w-0.5 h-5 bg-slate-200"></div>
          <Menu strokeWidth={2} width={28} height={28} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
