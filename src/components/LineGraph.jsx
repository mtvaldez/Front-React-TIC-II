import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import SideBar from "../components/SideBar";

function LineGraph(props) {

    const data = [
        { hour: '00:00', camera: 15, RFID: 8 },
        { hour: '01:00', camera: 22, RFID: 11 },
        { hour: '02:00', camera: 17, RFID: 14 },
        { hour: '03:00', camera: 28, RFID: 16 },
        { hour: '04:00', camera: 34, RFID: 18 },
        { hour: '05:00', camera: 29, RFID: 21 },
        { hour: '06:00', camera: 41, RFID: 12 },
        { hour: '07:00', camera: 38, RFID: 10 },
        { hour: '08:00', camera: 45, RFID: 15 },
        { hour: '09:00', camera: 52, RFID: 17 },
        { hour: '10:00', camera: 63, RFID: 19 },
        { hour: '11:00', camera: 70, RFID: 23 },
        { hour: '12:00', camera: 58, RFID: 20 },
        { hour: '13:00', camera: 64, RFID: 18 },
        { hour: '14:00', camera: 75, RFID: 21 },
        { hour: '15:00', camera: 80, RFID: 24 },
        { hour: '16:00', camera: 67, RFID: 26 },
        { hour: '17:00', camera: 71, RFID: 28 },
        { hour: '18:00', camera: 79, RFID: 30 },
        { hour: '19:00', camera: 85, RFID: 33 },
        { hour: '20:00', camera: 90, RFID: 35 },
        { hour: '21:00', camera: 94, RFID: 38 },
        { hour: '22:00', camera: 97, RFID: 40 },
        { hour: '23:00', camera: 102, RFID: 42 }
      ];

    
    return(
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
            <SideBar/>
            <LineChart width={800} height={400} data={data} className="px-20">
                <XAxis dataKey="hour" />
                <YAxis label={{ value: props.entryType, angle: -90, position: "insideLeft" }} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="camera" stroke="#82ca9d" />
                <Line type="monotone" dataKey="RFID" stroke="#8884d8" />
            </LineChart>
            <h1>{props.Title}</h1>
        </div>
    );  
}
  
export default LineGraph;