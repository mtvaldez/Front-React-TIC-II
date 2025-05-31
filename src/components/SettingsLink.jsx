import { MyCardPswd } from "./settingsCards/MyCardPswd";
import { MyCardUser } from "./settingsCards/MyCardUser";
import { MyCardRFID } from "./settingsCards/MyCardRFID";
import { MyCardPic } from "./settingsCards/MyCardPic";
import { MyCardAL } from "./settingsCards/MyCardAL";
import { MyCardAdmin } from "./settingsCards/MyCardAdmin";
import { MyCardDeleteUser } from "./settingsCards/MyCardDeleteUser";
import { MyCardDoor } from "./settingsCards/MyCardDoor";
import { MyCardDoorAL } from "./settingsCards/MyCardDoorAL";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from 'react';
import { IdCard, Trash2, WholeWord, ScanFace, Settings2, DoorOpenIcon } from "lucide-react";
import { UserPlus } from "lucide-react";
import { MyCardDeleteDoor } from "./settingsCards/MyCardDeleteDoor";
import { MyCardDoorPasscode } from "./settingsCards/MyCardDoorPasscode";

export function SettingsLinkPswd(props) {
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

export function SettingsLinkUser() {
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

export function SettingsLinkDoor() {
  const [open, setOpen] = useState(false);

  return (
    <div>
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

export function SettingsLinkPic({ id }) {
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

export function SettingsDeleteUser({ id }) {
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

export function SettingsDeleteDoor({ id }) {
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
          <MyCardDeleteDoor doorId={id} closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function SettingsLinkDoorPasscode({ id }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
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

export function SettingsChangeDoorAL({ id }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
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

export function SettingsLinkRFID({ id }) {
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

export function SettingsLinkAL({ id }) {
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

export function SettingsLinkAdmin({ text }) {
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