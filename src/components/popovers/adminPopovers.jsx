import { MyCardAdmin } from "../Cards/MyCardAdmin";
import { MyCardPswd } from "../Cards/MyCardPswd";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from 'react';
import { UserCog } from "lucide-react";

export function ChangeAdminPasswordPopover(props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <li className="cursor-pointer hover:text-blue-600 hover:underline transition" onClick={() => setOpen(true)}>
            {props.text}
          </li>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardPswd closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function CreateAdminPopover() {
  const [open, setOpen] = useState(false);

  return (
    <div className="z-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow transition"  onClick={() => setOpen(true)}>
            <UserCog />
            Add New Admin
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardAdmin closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );

}