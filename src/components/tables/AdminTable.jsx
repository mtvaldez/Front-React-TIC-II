export function AdminTable({ admins }) {
  return (
    <table className="min-w-full text-left border border-gray-300">
      <thead className="bg-gray-100 sticky top-0">
        <tr>
          <th className="px-4 py-2 border text-center align-middle">Admin Email</th>
        </tr>
      </thead>
      <tbody>
        {admins.map((email, id) => (
          <tr key={id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border text-center align-middle">{email}</td>
          </tr>
        ))}
      </tbody>
    </table>

  );
}