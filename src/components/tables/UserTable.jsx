import { SettingsLinkAL, SettingsLinkRFID, SettingsLinkPic, SettingsDeleteUser } from "../SettingsLink";

export function TableDisp({users}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border text-center align-middle">Full Name</th>
            <th className="px-4 py-2 border text-center align-middle">CID</th>
            <th className="px-4 py-2 border text-center align-middle">Access Level</th>
            <th className="px-4 py-2 border text-center align-middle">Has RFID</th>
            <th className="px-4 py-2 border text-center align-middle">Has FaceR</th>
            <th className="px-4 py-2 border text-center align-middle">Set Access Level</th>
            <th className="px-4 py-2 border text-center align-middle">Set RFID</th>
            <th className="px-4 py-2 border text-center align-middle">Set FaceR</th>
            <th className="px-4 py-2 border text-center align-middle">Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} data-user-id={user.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-center align-middle">{user.fullName}</td>
              <td className="px-4 py-2 border text-center align-middle">{user.cid}</td>
              <td className="px-4 py-2 border text-center align-middle">{user.accessLevel}</td>
              <td className="px-4 py-2 border text-center align-middle">{user.hasRfid ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 border text-center align-middle">{user.hasFace ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 border text-center align-middle"> <SettingsLinkAL text="Change" id={user.id}/> </td>
              <td className="px-4 py-2 border text-center align-middle"> <SettingsLinkRFID text="Set" id={user.id}/> </td>
              <td className="px-4 py-2 border text-center align-middle"> <SettingsLinkPic text="Set" id={user.id}/> </td>
              <td className="px-4 py-2 border text-center align-middle"> <SettingsDeleteUser text="DELETE" id={user.id}/> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}