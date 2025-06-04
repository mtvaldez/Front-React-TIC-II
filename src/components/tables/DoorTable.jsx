import { ChangeDoorALPopover, ChangeDoorPasscodePopover, DeleteDoorPopover } from "../popovers/doorPopovers";

export function DoorTable({doors}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border text-center align-middle">Door Name</th>
            <th className="px-4 py-2 border text-center align-middle">Door Level</th>
            <th className="px-4 py-2 border text-center align-middle">Update Door Level</th>
            <th className="px-4 py-2 border text-center align-middle">Change Door Passcode</th>
            <th className="px-4 py-2 border text-center align-middle">Delete Door</th>
          </tr>
        </thead>
        <tbody>
          {doors.map((door) => (
            <tr key={door.id} data-door-id={door.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-center align-middle">{door.name}</td>
              <td className="px-4 py-2 border text-center align-middle">{door.accessLevel}</td>
              <td className="px-4 py-2 border text-center align-middle"> <ChangeDoorALPopover text="Set" id={door.id}/> </td>
              <td className="px-4 py-2 border text-center align-middle"> <ChangeDoorPasscodePopover text="Set" id={door.id}/> </td>
              <td className="px-4 py-2 border text-center align-middle"> <DeleteDoorPopover text="DELETE" id={door.id}/> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}