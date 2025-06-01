import SideBar from "../components/SideBar";
import LineGraph from "../components/LineGraph";
import { ComboBox } from "../components/ComboBox";
import { useEffect, useState } from "react";
import { getDoors } from "@/services/DoorService";
import { getFailedAccessData, getSuccessfulAccessData } from "@/services/StatisticsService";

function Menu() {
  const ONE_DAY_MILLIS = 86400000;

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [failedData, setFailedData] = useState(null);
  const [failedDataMap, setFailedDataMap] = useState(null);
  const [successfulDataMap, setSuccessfulDataMap] = useState(null);
  const [sucData, setSucData] = useState(null);

  async function fetchDoors() {
    try {
      const allDoors = await getDoors();
      const doors = allDoors.map(door => ({ value: door.name, label: door.name, accessLevel: door.accessLevel }));
      setOptions(doors);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function fetchSuccessfulAccessData() {
    setLoading(true);
    try {
      const currentDate = Date.now();
      const previousDate = currentDate - ONE_DAY_MILLIS;

      const successful = await getSuccessfulAccessData(previousDate, currentDate);

      const successfulMap = groupByDoorsMap(successful);

      setSuccessfulDataMap(successfulMap);
    } catch (error) {
      console.error("Error fetching door data:", error);
    } finally {
      setLoading(false);
    }
  }

  function groupByDoorsMap(arr) {
    const groupedMap = new Map()
    arr.forEach((entry) => {
      if (groupedMap.has(entry.doorName)) {
        groupedMap.get(entry.doorName)
          .push({
            // hour: (entry.hour / 3600000) % 24,
            // hour: new Date(entry.unixtimeroundedbyhour).getHours(),
            hour: entry.hour,
            cameraCount: entry.cameraCount,
            rfidCount: entry.rfidCount
          });
      } else {
        groupedMap.set(entry.doorName, [{
          // hour: (entry.hour / 3600000) % 24,
          // hour: new Date(entry.unixtimeroundedbyhour).getHours(),
          hour: entry.hour,
          cameraCount: entry.cameraCount,
          rfidCount: entry.rfidCount
        }]);
      }
    });
    return groupedMap;
  }

  async function fetchFailedAccessData() {
    setLoading(true);
    try {
      const currentDate = Date.now();
      const previousDate = currentDate - ONE_DAY_MILLIS;

      const failed = await getFailedAccessData(previousDate, currentDate)

      const failedMap = groupByDoorsMap(failed)

      setFailedDataMap(failedMap);
    } catch (error) {
      console.error("Error fetching door data:", error);
    } finally {
      setLoading(false);
    }
  }

  function loadGraph(selectedDoor) {
    setFailedData(failedDataMap.get(selectedDoor));
    setSucData(successfulDataMap.get(selectedDoor));
  }

  useEffect(() => {
    fetchDoors();
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
        <div className="flex flex-row space-x-4">
          <LineGraph entryType="Successful Entries" data={sucData} />
          <LineGraph entryType="Failed Entries" data={failedData} />
        </div>
        {/* <LineGraph entryType="Succesful Entries" data={sucData} /> */}
        {/* <LineGraph entryType="Failed Entries" data={failedData} /> */}
      </div>
    </div>
  );
}

export default Menu;