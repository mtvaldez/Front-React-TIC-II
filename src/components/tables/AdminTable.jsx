export function AdminTable({ admins }) {
  return (
    <table className="min-w-full text-sm text-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <thead className="bg-gray-50 sticky top-0 z-10 text-gray-700">
        <tr>
          <th className="px-4 py-3 border-b">Admin Email</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {admins.map((email, id) => (
          <tr
            key={id}
            className={id % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}
          >
            <td className="px-4 py-2 align-middle font-medium">{email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // return (
  //   <table className="min-w-full text-left border border-gray-300">
  //     <thead className="bg-gray-100 sticky top-0">
  //       <tr>
  //         <th className="px-4 py-2 border text-center align-middle">Admin Email</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {admins.map((email, id) => (
  //         <tr key={id} className="hover:bg-gray-50">
  //           <td className="px-4 py-2 border text-center align-middle">{email}</td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>

  // );
}