import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { DoorOpenIcon, Trash2, WholeWord, Settings2 } from "lucide-react";
import { MyCardDoor } from "../Cards/MyCardDoor";
import { MyCardDeleteDoor } from "../Cards/MyCardDeleteDoor";
import { MyCardDoorPasscode } from "../Cards/MyCardDoorPasscode";
import { MyCardDoorAL } from "../Cards/MyCardDoorAL";
import { useState } from "react";

export function CreateDoorPopover() {
  const [open, setOpen] = useState(false);

  return (
    <div className="z-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow transition"
            onClick={() => setOpen(true)}>
            <DoorOpenIcon size={18} />
            Add Door
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardDoor closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function DeleteDoorPopover({ id }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="z-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="bg-red-700 hover:bg-red-800 text-white font-medium px-4 py-2 rounded shadow transition" onClick={() => setOpen(true)}>
            {/* {text} */}
            <Trash2 />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardDeleteDoor doorId={id} closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function ChangeDoorPasscodePopover({ id }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="z-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded transition shadow" onClick={() => setOpen(true)}>
            {/* {text} */}
            <WholeWord />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardDoorPasscode doorId={id} closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function ChangeDoorALPopover({ id }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="z-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="bg-amber-400 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded shadow transition" onClick={() => setOpen(true)}>
            <Settings2 />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardDoorAL doorId={id} closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}