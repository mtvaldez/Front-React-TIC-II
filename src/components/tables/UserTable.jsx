import { SetAccessLevelPopover, LinkRFIDPopover, AssignFacePopover, DeleteUserPopover } from "../popovers/userPopovers";

export function UserTable({ users }) {

  return (
    <table className="min-w-full text-sm text-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <thead className="bg-gray-50 sticky top-0 z-10 text-gray-700">
        <tr>
          <th className="px-4 py-3 border-b">Full Name</th>
          <th className="px-4 py-3 border-b">CID</th>
          <th className="px-4 py-3 border-b">Access Level</th>
          <th className="px-4 py-3 border-b">Has RFID</th>
          <th className="px-4 py-3 border-b">Has FaceR</th>
          <th className="px-4 py-3 border-b">Set Access Level</th>
          <th className="px-4 py-3 border-b">Set RFID</th>
          <th className="px-4 py-3 border-b">Set FaceR</th>
          <th className="px-4 py-3 border-b">Delete User</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {users.map((user, index) => (
          <tr
            key={user.uuid}
            className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}
          >
            <td className="px-4 py-2 font-medium">{user.fullName}</td>
            <td className="px-4 py-2">{user.cid}</td>
            <td className="px-4 py-2">{user.accessLevel}</td>
            <td className="px-4 py-2">{user.hasRfid ? "Yes" : "No"}</td>
            <td className="px-4 py-2">{user.hasFace ? "Yes" : "No"}</td>
            <td className="px-4 py-2"><SetAccessLevelPopover id={user.uuid} /></td>
            <td className="px-4 py-2"><LinkRFIDPopover id={user.uuid} /></td>
            <td className="px-4 py-2"><AssignFacePopover id={user.uuid} /></td>
            <td className="px-4 py-2"><DeleteUserPopover id={user.uuid} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  //   return (
  //   <table className="min-w-full text-left border border-gray-300">
  //     {/* <thead className="sticky top-0 bg-gray-100 z-20 shadow border-b"> */}
  //     <thead className="bg-gray-100 sticky top-0">
  //       <tr>
  //         <th className="px-4 py-2 border text-center">Full Name</th>
  //         <th className="px-4 py-2 border text-center">CID</th>
  //         <th className="px-4 py-2 border text-center">Access Level</th>
  //         <th className="px-4 py-2 border text-center">Has RFID</th>
  //         <th className="px-4 py-2 border text-center">Has FaceR</th>
  //         <th className="px-4 py-2 border text-center">Set Access Level</th>
  //         <th className="px-4 py-2 border text-center">Set RFID</th>
  //         <th className="px-4 py-2 border text-center">Set FaceR</th>
  //         <th className="px-4 py-2 border text-center">Delete User</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {users.map((user) => (
  //         <tr key={user.uuid} className="hover:bg-gray-50">
  //           <td className="px-4 py-2 border text-center">{user.fullName}</td>
  //           <td className="px-4 py-2 border text-center">{user.cid}</td>
  //           <td className="px-4 py-2 border text-center">{user.accessLevel}</td>
  //           <td className="px-4 py-2 border text-center">{user.hasRfid ? 'Yes' : 'No'}</td>
  //           <td className="px-4 py-2 border text-center">{user.hasFace ? 'Yes' : 'No'}</td>
  //           <td className="px-4 py-2 border text-center"><SetAccessLevelPopover id={user.uuid} /></td>
  //           <td className="px-4 py-2 border text-center"><LinkRFIDPopover id={user.uuid} /></td>
  //           <td className="px-4 py-2 border text-center"><AssignFacePopover id={user.uuid} /></td>
  //           <td className="px-4 py-2 border text-center"><DeleteUserPopover id={user.uuid} /></td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
}


// export function UserTable({users}) {
//   return (
//     <div className="overflow-x-auto max-h-80">
//       <table className="min-w-full text-left border border-gray-300">
//         <thead className="bg-gray-100 sticky top-0 z-10">
//           <tr>
//             <th className="px-4 py-2 border text-center align-middle">Full Name</th>
//             <th className="px-4 py-2 border text-center align-middle">CID</th>
//             <th className="px-4 py-2 border text-center align-middle">Access Level</th>
//             <th className="px-4 py-2 border text-center align-middle">Has RFID</th>
//             <th className="px-4 py-2 border text-center align-middle">Has FaceR</th>
//             <th className="px-4 py-2 border text-center align-middle">Set Access Level</th>
//             <th className="px-4 py-2 border text-center align-middle">Set RFID</th>
//             <th className="px-4 py-2 border text-center align-middle">Set FaceR</th>
//             <th className="px-4 py-2 border text-center align-middle">Delete User</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} data-user-id={user.id} className="hover:bg-gray-50">
//               <td className="px-4 py-2 border text-center align-middle">{user.fullName}</td>
//               <td className="px-4 py-2 border text-center align-middle">{user.cid}</td>
//               <td className="px-4 py-2 border text-center align-middle">{user.accessLevel}</td>
//               <td className="px-4 py-2 border text-center align-middle">{user.hasRfid ? 'Yes' : 'No'}</td>
//               <td className="px-4 py-2 border text-center align-middle">{user.hasFace ? 'Yes' : 'No'}</td>
//               <td className="px-4 py-2 border text-center align-middle"> <SetAccessLevelPopover id={user.id}/> </td>
//               <td className="px-4 py-2 border text-center align-middle"> <LinkRFIDPopover id={user.id}/> </td>
//               <td className="px-4 py-2 border text-center align-middle"> <AssignFacePopover id={user.id}/> </td>
//               <td className="px-4 py-2 border text-center align-middle"> <DeleteUserPopover id={user.id}/> </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }