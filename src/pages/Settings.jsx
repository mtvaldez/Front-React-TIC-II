import SideBar from "../components/SideBar";
import { SettingsLinkAdmin, SettingsLinkAL, SettingsLinkPic, SettingsLinkPswd, SettingsLinkRFID, SettingsLinkUser } from "../components/SettingsLink";

function Settings() {
  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex-1 px-10 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-left">
          Settings
        </h1>
        <ul className="space-y-4 text-lg text-gray-700 text-left">
          <SettingsLinkAdmin text="➤ Add Admin"/>
          <SettingsLinkPswd text="➤ Change My Password"/>
        </ul>
      </div>
    </div>
  );
}

export default Settings;
