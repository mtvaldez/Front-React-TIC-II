export function TableDisp(props) {
  return (
    <div className="h-96 overflow-y-auto border border-gray-300 rounded bg-white mt-4">
      
      <table className="min-w-full table-auto text-sm text-gray-800">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            {props.columns.map((col, index) => (
              <th key={index} className="px-4 py-2 text-center">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((line, index) => {
            const parts = line.split("|");
            return (
              <tr key={index} className="border-t">
                {parts.map((part, i) => (
                  <td key={i} className="px-4 py-2 text-center">
                    {part.trim()}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
