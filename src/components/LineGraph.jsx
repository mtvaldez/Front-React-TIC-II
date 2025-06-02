import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function LineGraph({ data, entryType, green }) {
  const camaraCol = "#ff27a3"
  const rfidCol = "#fb5d15"

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <h2 className="text-lg font-semibold mb-2">{entryType}</h2>
        <p>No data available for the selected door.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-start">


      <div className="text-center mt-4 text-gray-600">
        <h3 className={`text-lg font-medium mb-3 ${green ? "text-green-600" : "text-red-600"}`} >{entryType}</h3>
      </div>

      <div className="w-full h-full px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="hour" tickFormatter={(unix) => new Date(unix).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", })} />
            <YAxis label={{ value: entryType, angle: -90, position: "insideLeft", }} />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip labelFormatter={(unix) => new Date(unix).toLocaleString()}
              formatter={(value, name) => {
                const labelMap = { cameraCount: "Camera 📸", rfidCount: "RFID 🔑", };
                return [value, labelMap[name] || name];
              }} />
            <Line type="monotone" dataKey="cameraCount" stroke={camaraCol} dot={{ r: 4, fill: camaraCol }} />
            <Line type="monotone" dataKey="rfidCount" stroke={rfidCol} dot={{ r: 4, fill: rfidCol }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
  
      <div className="mr-6 mt-4 space-y-2 self-end">
        {[{ label: "Camera", color: camaraCol }, { label: "RFID", color: rfidCol } ].map(({ label, color }) => (
          <div key={label} className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );


  // return (
  //   <div>
  //     <div className="mr-6 mt-10 space-y-2">
  //       <div className="flex items-center space-x-2">
  //         <div className="w-4 h-4 bg-[#82ca9d] rounded-sm"></div>
  //         <span className="text-sm">Camera</span>
  //       </div>
  //       <div className="flex items-center space-x-2">
  //         <div className="w-4 h-4 bg-[#8884d8] rounded-sm"></div>
  //         <span className="text-sm">RFID</span>
  //       </div>
  //     </div>

  //     <div className="text-center mt-10 text-gray-600">
  //       <h2 className="text-lg font-semibold mb-2">{entryType}</h2>
  //     </div>
  //     <LineChart width={800} height={400} data={data} className="px-20">
  //       <XAxis dataKey="hour" tickFormatter={(unix) => new Date(unix).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} />
  //       <YAxis label={{ value: entryType, angle: -90, position: "insideLeft" }} />
  //       <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
  //       <Tooltip labelFormatter={(unix) => new Date(unix).toLocaleString()}
  //         formatter={(value, name) => {
  //           const labelMap = { cameraCount: "📸 Camera", rfidCount: "🔑 RFID" };
  //           return [value, labelMap[name] || name];
  //         }} />
  //       <Line type="monotone" dataKey="cameraCount" stroke="#82ca9d" />
  //       <Line type="monotone" dataKey="rfidCount" stroke="#8884d8" />
  //     </LineChart>

  //   </div>
  // );
}

export default LineGraph;
