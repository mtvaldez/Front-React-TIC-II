import { MyCardAdmin } from "../Cards/MyCardAdmin";
import { MyCardPswd } from "../Cards/MyCardPswd";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from 'react';

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

export function CreateAdminPopover({ text }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <li className="cursor-pointer hover:text-blue-600 hover:underline transition" onClick={() => setOpen(true)}>
            {text}
          </li>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardAdmin closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );

}