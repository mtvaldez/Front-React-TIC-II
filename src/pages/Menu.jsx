import SideBar from "../components/SideBar";
import LineGraph from "../components/LineGraph";
import { ComboBox } from "../components/ComboBox";
import { useEffect, useState } from "react";

function Menu() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [failedData, setFailedData] = useState(null);
  const [sucData, setSucData] = useState(null);

  async function getDoors() {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${localStorage.getItem("url")}/doors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      const data = await response.json();
      const doors = data.doors.map(door => ({
        value: door,
        label: door
      }));
      setOptions(doors);
      setLoading(false);
    } catch (error) {
      alert("Error fetching doors:", error);
      setLoading(false);
    }
  }
  
  async function fetchDoorData(door) {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:1234/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ door }),
      });

      const data = await response.json();

      const successful = data.successful.map((entry) => ({
        hour: entry.hour,
        cameraCount: entry.camera,
        rfidCount: entry.RFID,
      }));

      const failed = data.failed.map((entry) => ({
        hour: entry.hour,
        cameraCount: entry.camera,
        rfidCount: entry.RFID,
      }));

      setSucData(successful);
      setFailedData(failed);
    } catch (error) {
      console.error("Error fetching door data:", error);
      alert("Error fetching door data.");
    } finally {
      setLoading(false);
    }
  }

useEffect(() => {
  getDoors();
}, []);

useEffect(() => {
  if (selectedDoor) {
    fetchDoorData(selectedDoor);
  }
}, [selectedDoor]);

if (loading) {
  return (
    <div className="flex justify-start items-center">
      <SideBar />
      <div className="flex justify-evenly items-center ml-90">
        <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-16 w-16"></div>
        <h1 className="text-xl font-semibold text-gray-700 ml-5">Loading...</h1>
      </div>
    </div>
  );
}

  return (
    <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full h-screen justify-start items-center pt-0">
            <div className="flex items-center gap-x-4 mb-4">
                <h1 className="font-semibold text-lg">Entry attempts on</h1>
                <ComboBox options={options} selected={selectedDoor} 
                onChange={setSelectedDoor} text="Select Door..."
                />
                <h1 className="font-semibold text-lg">door today</h1>
            </div>
            <LineGraph entryType="Succesful Entries" data={sucData}/>
            <LineGraph entryType="Failed Entries" data={failedData}/>
        </div>
    </div>
  );
}

export default Menu;