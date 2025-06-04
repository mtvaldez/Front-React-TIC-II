import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { UserPlus, ScanFace, Trash2, IdCard, Settings2 } from "lucide-react";
import { MyCardUser } from "../Cards/MyCardUser";
import { MyCardPic } from "../Cards/MyCardPic";
import { MyCardDeleteUser } from "../Cards/MyCardDeleteUser";
import { MyCardRFID } from "../Cards/MyCardRFID";
import { MyCardAL } from "../Cards/MyCardAL";
import { useState } from "react";

export function CreateUserPopover() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow transition"
            onClick={() => setOpen(true)}>
            <UserPlus size={18} />
            Add User
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardUser closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function AssignFacePopover({ id }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded transition shadow" onClick={() => setOpen(true)}>
            {/* {text} */}
            <ScanFace />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardPic userId={id} closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function DeleteUserPopover({ id }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="bg-red-700 hover:bg-red-800 text-white font-medium px-4 py-2 rounded shadow transition" onClick={() => setOpen(true)}>
            {/* {text} */}
            <Trash2 />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardDeleteUser userId={id} closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function LinkRFIDPopover({ id }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded transition shadow" onClick={() => setOpen(true)}>
            {/* {text} */}
            <IdCard />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardRFID userId={id} closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function SetAccessLevelPopover({ id }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="bg-amber-400 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded shadow transition" onClick={() => setOpen(true)}>
          {/* {text} */}
          <Settings2 />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <MyCardAL userId={id} closePopover={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}