import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function LineGraph({ entryType, data, green }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <h2 className="text-lg font-semibold mb-2">{entryType + " Graph"}</h2>
        <p>No data available for the selected door.</p>
      </div>
    );
  }
  
  const camaraCol = "#ff27a3"
  const rfidCol = "#fb5d15"

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="text-center text-gray-600 shrink-0">
        <h3 className={`text-lg font-medium mb-3 ${green ? "text-green-600" : "text-red-600"}`}>
          {entryType + " Graph"}
        </h3>
      </div>

      {/* Graph and legend */}
      <div className="flex flex-1 min-h-0 px-4 overflow-hidden">
        {/* Chart */}
        <div className="flex-1 min-w-0 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="hour"
                tickFormatter={(unix) =>
                  new Date(unix).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                }
              />
              <YAxis label={{ value: entryType, angle: -90, position: "insideLeft" }} />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Tooltip
                wrapperStyle={{ overflow: "visible" }}
                labelFormatter={(unix) => new Date(unix).toLocaleString("es-UY", { timeZone: "UTC" })}
                formatter={(value, name) => {
                  const labelMap = { cameraCount: "Camera 📸", rfidCount: "RFID 🔑" };
                  return [value, labelMap[name] || name];
                }}
              />
              <Line type="monotone" dataKey="cameraCount" stroke={camaraCol} dot={{ r: 4, fill: camaraCol }} />
              <Line type="monotone" dataKey="rfidCount" stroke={rfidCol} dot={{ r: 4, fill: rfidCol }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="ml-6 flex flex-col justify-center space-y-2 w-24 shrink-0">
          {[{ label: "Camera", color: camaraCol }, { label: "RFID", color: rfidCol }].map(
            ({ label, color }) => (
              <div key={label} className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: color }} />
                <span className="text-sm">{label}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
