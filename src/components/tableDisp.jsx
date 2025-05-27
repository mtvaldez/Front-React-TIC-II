import { SettingsLinkAL, SettingsLinkRFID, SettingsLinkPic, SettingsDeleteUser } from "./SettingsLink";

export function TableDisp({users}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Full Name</th>
            <th className="px-4 py-2 border">CID</th>
            <th className="px-4 py-2 border">Access Level</th>
            <th className="px-4 py-2 border">Has RFID</th>
            <th className="px-4 py-2 border">Has FaceR</th>
            <th className="px-4 py-2 border">Change Access Level</th>
            <th className="px-4 py-2 border">Set RFID</th>
            <th className="px-4 py-2 border">Set FaceR</th>
            <th className="px-4 py-2 border">Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} data-user-id={user.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{user.fullName}</td>
              <td className="px-4 py-2 border">{user.cid}</td>
              <td className="px-4 py-2 border">{user.accessLevel}</td>
              <td className="px-4 py-2 border">{user.hasRfid ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 border">{user.hasFace ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 border"> <SettingsLinkAL text="Change" id={user.id}/> </td>
              <td className="px-4 py-2 border"> <SettingsLinkRFID text="Change" id={user.id}/> </td>
              <td className="px-4 py-2 border"> <SettingsLinkPic text="Change" id={user.id}/> </td>
              <td className="px-4 py-2 border"> <SettingsDeleteUser text="DELETE" id={user.id}/> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// const values = [
  //   "Alice | Smith | Door 1 | 2025-05-01 | 08:15 AM | camera",
  //   "Bob | Johnson | Door 2 | 2025-05-02 | 09:20 AM | RFID",
  //   "Charlie | Brown | Door 3 | 2025-05-03 | 10:05 AM | camera",
  //   "Dana | White | Door 1 | 2025-05-04 | 11:45 AM | RFID",
  //   "Eli | Black | Door 2 | 2025-05-05 | 12:30 PM | camera",
  //   // Additional lines...
  // ];

  // const values2 = [
  //   "Door 1 | 2025-05-01 | 08:15 AM | camera",
  //   "Door 2 | 2025-05-02 | 09:20 AM | RFID",
  //   "Door 3 | 2025-05-03 | 10:05 AM | camera",
  //   "Door 1 | 2025-05-04 | 11:45 AM | RFID",
  //   "Door 2 | 2025-05-05 | 12:30 PM | camera",
  //   // Additional lines...
  // ];
