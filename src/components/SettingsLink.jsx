import { MyCardPswd } from "./settingsCards/MyCardPswd";
import { MyCardUser } from "./settingsCards/MyCardUser";
import { MyCardRFID } from "./settingsCards/MyCardRFID";
import { MyCardPic } from "./settingsCards/MyCardPic";
import { MyCardAL } from "./settingsCards/MyCardAL";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { MyCardAdmin } from "./settingsCards/MyCardAdmin";
import { useState } from 'react';

export function SettingsLinkPswd(props){
  const [open, setOpen] = useState(false);  
  
  return(
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <li className="cursor-pointer hover:text-blue-600 hover:underline transition" onClick={() => setOpen(true)}>
            {props.text}
          </li>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardPswd closePopover={() => setOpen(false)}/>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function SettingsLinkUser({ text }){
  const [open, setOpen] = useState(false);
  
  return(
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <li className="cursor-pointer hover:text-blue-600 hover:underline transition" onClick={() => setOpen(true)}>
            {text}
          </li>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardUser closePopover={() => setOpen(false)}/>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function SettingsLinkPic({ text, id }){
  const [open, setOpen] = useState(false);
  
  return(
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => setOpen(true)}>
            {text}
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <MyCardPic userId={id} closePopover={() => setOpen(false)}/>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function SettingsLinkRFID({ text, id }){
  const [open, setOpen] = useState(false);
  return(
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => setOpen(true)}>
                {text}
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <MyCardRFID userId={id} closePopover={() => setOpen(false)}/>
            </PopoverContent>
            </Popover>
        </div>
    );
}

export function SettingsLinkAL({ text, id }) {
  const [open, setOpen] = useState(false);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={() => setOpen(true)}>
          {text}
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <MyCardAL userId={id} closePopover={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}

export function SettingsLinkAdmin( {text} ){
  const [open, setOpen] = useState(false);
  
  return(
    <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <li className="cursor-pointer hover:text-blue-600 hover:underline transition" onClick={() => setOpen(true)}>
              {text}
            </li>
          </PopoverTrigger>
          <PopoverContent>
            <MyCardAdmin closePopover={() => setOpen(false)}/>
          </PopoverContent>
          </Popover>
      </div>
  );

}