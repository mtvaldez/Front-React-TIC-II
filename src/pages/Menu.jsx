import SideBar from "../components/SideBar";
import LineGraph from "../components/LineGraph";
import { ComboBox } from "../components/ComboBox";
import { useEffect, useState } from "react";

function Menu() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [failedData, setFailedData] = useState(null);
  const [failedDataMap, setFailedDataMap] = useState(null);
  const [successfulDataMap, setSuccessfulDataMap] = useState(null);
  const [sucData, setSucData] = useState(null);

  async function getDoors() {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${localStorage.getItem("url")}/doors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
  
      const data = await response.json();
      const doors = data.map(door => ({
        value: door.name,
        label: door.name,
        accessLevel: door.accessLevel
      }));
      setOptions(doors);
      setLoading(false);
    } catch (error) {
      alert("Error fetching doors:", error);
      setLoading(false);
    }
  }
  
  async function fetchSuccessfulAccessData() {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");

      const url = new URL(`${localStorage.getItem("url")}/statistics/successful-access-count`);

      const currentDate = Date.now();
      const previousDate = currentDate-864000000;

      const params = {
          startDate: previousDate,
          endDate: currentDate
        };
      url.search = new URLSearchParams(params).toString();

      const response = await fetch(url.toString(),  {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();

      const successful = data.map((entry) => ({
        hour: entry.dateTime,
        cameraCount: entry.cameraAccessCount,
        rfidCount: entry.rfidAccessCount,
        doorName: entry.doorName
      }));

      const successfulMap = new Map();

      successful.forEach((entry) => {
        if (successfulMap.has(entry.doorName)) {
          successfulMap.get(entry.doorName).push({
            hour: (entry.hour/3600000)%24,
            cameraCount: entry.cameraCount,
            rfidCount: entry.rfidCount
          });
        }else {
          successfulMap.set(entry.doorName, [{
            hour: (entry.hour/3600000)%24,
            cameraCount: entry.cameraCount,
            rfidCount: entry.rfidCount
          }]);
        }
      });

      setSuccessfulDataMap(successfulMap);
    } catch (error) {
      console.error("Error fetching door data:", error);
      alert("Error fetching door data.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchFailedAccessData() {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");

      const url = new URL(`${localStorage.getItem("url")}/statistics/failed-access-count`);

      const currentDate = Date.now();
      const previousDate = currentDate-864000000;

      const params = {
          startDate: previousDate,
          endDate: currentDate
        };
      url.search = new URLSearchParams(params).toString();

      const response = await fetch(url.toString(),  {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();

      const failed = data.map((entry) => ({
        hour: entry.dateTime,
        cameraCount: entry.cameraAccessCount,
        rfidCount: entry.rfidAccessCount,
        doorName: entry.doorName
      }));

      console.log("failed: " + failed);

      const failedMap = new Map();

      failed.forEach((entry) => {
        if (failedMap.has(entry.doorName)) {
          failedMap.get(entry.doorName).push({
            hour: (entry.hour/3600000)%24,
            cameraCount: entry.cameraCount,
            rfidCount: entry.rfidCount
          });
        }else {
          failedMap.set(entry.doorName, [{
            hour: (entry.hour/3600000)%24,
            cameraCount: entry.cameraCount,
            rfidCount: entry.rfidCount
          }]);
        }
      });

      console.log("failed map: " + failedMap);
      setFailedDataMap(failedMap);
    } catch (error) {
      console.error("Error fetching door data:", error);
      alert("Error fetching door data.");
    } finally {
      setLoading(false);
    }
  } 

  function loadGraph(selectedDoor) {
    setFailedData(failedDataMap.get(selectedDoor));
    setSucData(successfulDataMap.get(selectedDoor));
  }

useEffect(() => {
  getDoors();
}, []);

useEffect(() => {
  fetchSuccessfulAccessData();
  fetchFailedAccessData();
}, []);

useEffect(() => {
  if (selectedDoor) {
    loadGraph(selectedDoor);
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
                onChange={setSelectedDoor} text="Select Door"
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