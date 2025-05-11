import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

function LineGraph(props) {
  if (!props.data || props.data.length === 0) {
    return <div className="text-center mt-10">No data available for the selected door.</div>;
  }

  return (
    <div>
      <div className="mr-6 mt-10 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-[#82ca9d] rounded-sm"></div>
          <span className="text-sm">camera</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-[#8884d8] rounded-sm"></div>
          <span className="text-sm">RFID</span>
        </div>
      </div>
      
      <LineChart width={800} height={400} data={props.data} className="px-20">
        <XAxis dataKey="hour" />
        <YAxis label={{ value: props.entryType, angle: -90, position: "insideLeft" }} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="cameraCount" stroke="#82ca9d" />
        <Line type="monotone" dataKey="rfidCount" stroke="#8884d8" />
      </LineChart>
      
      <h1>{props.Title}</h1>
    </div>
  );
}

export default LineGraph;
