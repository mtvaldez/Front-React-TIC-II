import SideBar from "../components/SideBar";
import { SettingsLinkAL, SettingsLinkPic, SettingsLinkPswd, SettingsLinkRFID, SettingsLinkUser } from "../components/SettingsLink";

function addUser() {
  fetch("http://10.252.50.2:8080/auth/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      email: 'ftambler@correo.um.edu.uy', 
      password: 'pinga' 
    })
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error("Login failed:", err);
  });
}

function Settings() {
  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex-1 px-10 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-left">
          Settings
        </h1>
        <ul className="space-y-4 text-lg text-gray-700 text-left">
          <SettingsLinkUser text="➤ Add User"/>
          <SettingsLinkPswd text="➤ Change Password"/>
          <SettingsLinkRFID text="➤ Associate New RFID"/>
          <SettingsLinkPic text="➤ Associate New Picture"/>
          <SettingsLinkAL text="➤ Change User Access Level"/>
        </ul>
      </div>
    </div>
  );
}

export default Settings;
