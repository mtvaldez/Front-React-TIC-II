import { MyCardPswd } from "./settingsCards/MyCardPswd";
import { MyCardUser } from "./settingsCards/MyCardUser";
import { MyCardRFID } from "./settingsCards/MyCardRFID";
import { MyCardPic } from "./settingsCards/MyCardPic";
import { MyCardAL } from "./settingsCards/MyCardAL";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { MyCardAdmin } from "./settingsCards/MyCardAdmin";


export function SettingsLinkPswd(props){
    return(
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <li
                className="cursor-pointer hover:text-blue-600 hover:underline transition"
              >
                {props.text}
              </li>
            </PopoverTrigger>
            <PopoverContent>
              <MyCardPswd/>
            </PopoverContent>
            </Popover>
        </div>
    );
}

export function SettingsLinkUser(props){
    return(
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <li
                className="cursor-pointer hover:text-blue-600 hover:underline transition"
              >
                {props.text}
              </li>
            </PopoverTrigger>
            <PopoverContent>
              <MyCardUser/>
            </PopoverContent>
            </Popover>
        </div>
    );
}

export function SettingsLinkPic(props){
    return(
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <li
                className="cursor-pointer hover:text-blue-600 hover:underline transition"
              >
                {props.text}
              </li>
            </PopoverTrigger>
            <PopoverContent>
              <MyCardPic/>
            </PopoverContent>
            </Popover>
        </div>
    );
}

export function SettingsLinkRFID(props){
    return(
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <li
                className="cursor-pointer hover:text-blue-600 hover:underline transition"
              >
                {props.text}
              </li>
            </PopoverTrigger>
            <PopoverContent>
              <MyCardRFID/>
            </PopoverContent>
            </Popover>
        </div>
    );
}

export function SettingsLinkAL(props){
    return(
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <li
                className="cursor-pointer hover:text-blue-600 hover:underline transition"
              >
                {props.text}
              </li>
            </PopoverTrigger>
            <PopoverContent>
              <MyCardAL/>
            </PopoverContent>
            </Popover>
        </div>
    );
  
}

export function SettingsLinkAdmin(props){
  return(
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <li
              className="cursor-pointer hover:text-blue-600 hover:underline transition"
            >
              {props.text}
            </li>
          </PopoverTrigger>
          <PopoverContent>
            <MyCardAdmin/>
          </PopoverContent>
          </Popover>
      </div>
  );

}