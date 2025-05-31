import { SettingsChangeDoorAL, SettingsLinkDoorPasscode, SettingsDeleteDoor } from "./SettingsLink";

export function DoorTable({doors}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Door Name</th>
            <th className="px-4 py-2 border">Door Level</th>
            <th className="px-4 py-2 border">Update Door Level</th>
            <th className="px-4 py-2 border">Change Door Passcode</th>
            <th className="px-4 py-2 border">Delete Door</th>
          </tr>
        </thead>
        <tbody>
          {doors.map((door) => (
            <tr key={door.id} data-door-id={door.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{door.name}</td>
              <td className="px-4 py-2 border">{door.accessLevel}</td>
              <td className="px-4 py-2 border"> <SettingsChangeDoorAL text="Set" id={door.id}/> </td>
              <td className="px-4 py-2 border"> <SettingsLinkDoorPasscode text="Set" id={door.id}/> </td>
              <td className="px-4 py-2 border"> <SettingsDeleteDoor text="DELETE" id={door.id}/> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}