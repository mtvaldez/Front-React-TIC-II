

export function SuccessAccessTable({ data, entryType, emptyMsg }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <h2 className="text-lg font-semibold mb-2">{entryType}</h2>
        <p>{emptyMsg}</p>
      </div>
    );
  }


  return (
    <div className="bg-white p-4 rounded-lg shadow h-full overflow-auto">
      <h3 className="text-lg font-medium mb-3 text-green-600">{entryType}</h3>
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="px-2 py-1">Full Name</th>
            <th className="px-2 py-1">Door</th>
            <th className="px-2 py-1">Type</th>
            <th className="px-2 py-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, i) => (
            <tr key={i} className="border-b">
              <td className="px-2 py-1">{entry.fullName}</td>
              <td className="px-2 py-1">{entry.doorName}</td>
              <td className="px-2 py-1">{entry.accessType}</td>
              <td className="px-2 py-1">{new Date(entry.accessDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}