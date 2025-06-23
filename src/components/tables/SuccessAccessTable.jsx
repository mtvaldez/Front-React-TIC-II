import { useState, useMemo } from "react";

export function SuccessAccessTable({ data, entryType, emptyMsg }) {
  const [filters, setFilters] = useState({ fullName: "", doorName: "" });

    const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.filter((entry) =>
      entry.fullName.toLowerCase().includes(filters.fullName.toLowerCase()) &&
      entry.doorName.toLowerCase().includes(filters.doorName.toLowerCase())
    );
  }, [data, filters]);

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <h2 className="text-lg font-semibold mb-2">{entryType}</h2>
        <p>{emptyMsg}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full overflow-auto flex flex-col">
      <h3 className="text-lg font-medium mb-3 text-green-600">{entryType}</h3>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input type="text" placeholder="Filter by Full Name" value={filters.fullName}
          onChange={(e) => setFilters((prev) => ({ ...prev, fullName: e.target.value }))}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
        />
        <input type="text" placeholder="Filter by Door Name" value={filters.doorName}
          onChange={(e) => setFilters((prev) => ({ ...prev, doorName: e.target.value }))}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

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
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No matching records found.
              </td>
            </tr>
          ) : (
            filteredData.map((entry, i) => (
              <tr key={i} className="border-b">
                <td className="px-2 py-1">{entry.fullName}</td>
                <td className="px-2 py-1">{entry.doorName}</td>
                <td className="px-2 py-1">{entry.accessType}</td>
                <td className="px-2 py-1">{new Date(entry.accessDate).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}