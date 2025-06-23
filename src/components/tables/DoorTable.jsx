import { ChangeDoorALPopover, ChangeDoorPasscodePopover, DeleteDoorPopover } from "../popovers/doorPopovers";

export function DoorTable({ doors }) {
  return (
    <table className="min-w-full text-sm text-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <thead className="bg-gray-50 sticky top-0 z-10 text-gray-700">
        <tr>
          <th className="px-4 py-3 border-b">Door Name</th>
          <th className="px-4 py-3 border-b">Door Level</th>
          <th className="px-4 py-3 border-b">Update Level</th>
          <th className="px-4 py-3 border-b">Change Passcode</th>
          <th className="px-4 py-3 border-b">Delete</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {doors.map((door, index) => (
          <tr
            key={door.id}
            data-door-id={door.id}
            className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}
          >
            <td className="px-4 py-2 align-middle font-medium">{door.name}</td>
            <td className="px-4 py-2 align-middle">{door.accessLevel}</td>
            <td className="px-4 py-2 align-middle">
              <ChangeDoorALPopover text="Set" id={door.id} />
            </td>
            <td className="px-4 py-2 align-middle">
              <ChangeDoorPasscodePopover text="Set" id={door.id} />
            </td>
            <td className="px-4 py-2 align-middle">
              <DeleteDoorPopover text="DELETE" id={door.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // return (
  //   <table className="min-w-full text-left border border-gray-300">
  //     <thead className="bg-gray-100 sticky top-0">
  //       <tr>
  //         <th className="px-4 py-2 border text-center align-middle">Door Name</th>
  //         <th className="px-4 py-2 border text-center align-middle">Door Level</th>
  //         <th className="px-4 py-2 border text-center align-middle">Update Door Level</th>
  //         <th className="px-4 py-2 border text-center align-middle">Change Door Passcode</th>
  //         <th className="px-4 py-2 border text-center align-middle">Delete Door</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {doors.map((door) => (
  //         <tr key={door.id} data-door-id={door.id} className="hover:bg-gray-50">
  //           <td className="px-4 py-2 border text-center align-middle">{door.name}</td>
  //           <td className="px-4 py-2 border text-center align-middle">{door.accessLevel}</td>
  //           <td className="px-4 py-2 border text-center align-middle"> <ChangeDoorALPopover text="Set" id={door.id} /> </td>
  //           <td className="px-4 py-2 border text-center align-middle"> <ChangeDoorPasscodePopover text="Set" id={door.id} /> </td>
  //           <td className="px-4 py-2 border text-center align-middle"> <DeleteDoorPopover text="DELETE" id={door.id} /> </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>

  // );
}