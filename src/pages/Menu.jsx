import SideBar from "../components/SideBar";
import LineGraph from "../components/LineGraph";
import { ComboBox } from "../components/ui/ComboBox";
import { useEffect, useState } from "react";
import { getDoors } from "@/services/DoorService";
import { getFailedAccessData, getSuccessfulAccessData } from "@/services/StatisticsService";
import { SuccessAccessTable } from "@/components/tables/SuccessAccessTable";
import { FailAccessTable } from "@/components/tables/FailAccessTable";
import { getFailedAccessBetween, getSuccessfulAccessBetween } from "@/services/AccessService";

function Menu() {
  const ONE_DAY_MILLIS = 86400000;
  const successTitle = "Successful Entries";
  const failTitle = "Failed Entries";

  const [options, setOptions] = useState([]);
  const [selectedDoor, setSelectedDoor] = useState(null);

  const [loading, setLoading] = useState(true);

  const [failedData, setFailedData] = useState(null);
  const [failedDataMap, setFailedDataMap] = useState(null);
  const [failedList, setFailedList] = useState(null);
  const [failedListMap, setFailedListMap] = useState(null);

  const [sucData, setSucData] = useState(null);
  const [successfulDataMap, setSuccessfulDataMap] = useState(null);
  const [sucList, setSucList] = useState(null);
  const [sucListMap, setSucListMap] = useState(null);


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
      const successfulMap = groupByKeyToMap(successful, "doorName");

      setSuccessfulDataMap(successfulMap);
    } catch (error) {
      console.error("Error fetching door data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchFailedAccessData() {
    setLoading(true);
    try {
      const currentDate = Date.now();
      const previousDate = currentDate - ONE_DAY_MILLIS;

      const failed = await getFailedAccessData(previousDate, currentDate)
      const failedMap = groupByKeyToMap(failed, "doorName");

      setFailedDataMap(failedMap);
    } catch (error) {
      console.error("Error fetching door data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSuccessfulList() {
    try {
      const currentDate = Date.now();
      const previousDate = currentDate - ONE_DAY_MILLIS;

      const successful = await getSuccessfulAccessBetween(previousDate, currentDate);
      const successfulMap = groupByKeyToMap(successful, "doorName");

      setSucListMap(successfulMap);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchFailedList() {
    try {
      const currentDate = Date.now();
      const previousDate = currentDate - ONE_DAY_MILLIS;

      const failed = await getFailedAccessBetween(previousDate, currentDate);
      const failedMap = groupByKeyToMap(failed, "doorName");

      setFailedListMap(failedMap);
    } catch (error) {
      console.error(error);
    }
  }

  // function groupByDoorsMap(arr) {
  //   const groupedMap = new Map()
  //   arr.forEach((entry) => {
  //     if (groupedMap.has(entry.doorName)) {
  //       groupedMap.get(entry.doorName)
  //         .push({
  //           hour: entry.hour,
  //           cameraCount: entry.cameraCount,
  //           rfidCount: entry.rfidCount
  //         });
  //     } else {
  //       groupedMap.set(entry.doorName, [{
  //         hour: entry.hour,
  //         cameraCount: entry.cameraCount,
  //         rfidCount: entry.rfidCount
  //       }]);
  //     }
  //   });
  //   return groupedMap;
  // }

  function groupByKeyToMap(arr, groupKey) {
    const groupedMap = new Map();

    arr.forEach((entry) => {
      const key = entry[groupKey];

      if (!groupedMap.has(key)) {
        groupedMap.set(key, []);
      }

      groupedMap.get(key).push(entry);
    });

    return groupedMap;
  }

  function loadGraph(selectedDoor) {
    setFailedData(failedDataMap.get(selectedDoor));
    setSucData(successfulDataMap.get(selectedDoor));
  }

  function loadTable(selectedDoor) {
    setFailedList(failedListMap.get(selectedDoor))
    setSucList(sucListMap.get(selectedDoor))
  }

  useEffect(() => {
    fetchDoors();
    fetchSuccessfulAccessData();
    fetchFailedAccessData();
    fetchSuccessfulList();
    fetchFailedList();
  }, []);

  useEffect(() => {
    if (selectedDoor) {
      loadGraph(selectedDoor);
      loadTable(selectedDoor);
    }
  }, [selectedDoor]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center">
          <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-16 w-16"></div>
          <h1 className="text-xl font-semibold text-gray-700 ml-5">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Last 24 hours' Accesses</h1>
      <hr className="my-4 border-gray-300" />
      <div className="flex items-center gap-x-4 mb-4 justify-center flex-wrap text-center">
        <h1 className="font-semibold text-lg">Entry attempts on</h1>
        <ComboBox options={options} selected={selectedDoor} onChange={setSelectedDoor}
          text="Select Door"
        />
        <h1 className="font-semibold text-lg">door today</h1>
      </div>

      {/* Top separator */}
      {/* <hr className="my-4 border-gray-300" /> */}

      {/* Graphs */}
      <div className="flex flex-wrap md:flex-nowrap w-full gap-4">
        <div className="flex-1 min-w-0">
          <LineGraph entryType={successTitle} data={sucData} green={true} />
        </div>
        <div className="hidden md:block w-px bg-gray-300" />
        <div className="flex-1 min-w-0">
          <LineGraph entryType={failTitle} data={failedData} green={false}/>
        </div>
      </div>

      {/* Bottom separator */}
      {/* <hr className="my-4 border-gray-300" /> */}

      {/* Tables */}
      <div className="flex flex-wrap md:flex-nowrap gap-4 mt-6 w-full">
        <div className="flex-1 min-w-0 bg-white p-4 shadow rounded-md">
          <SuccessAccessTable entryType={successTitle} data={sucList}  />
        </div>
        <div className="flex-1 min-w-0 bg-white p-4 shadow rounded-md">
          <FailAccessTable entryType={failTitle} data={failedList} />
        </div>
      </div>
    </div>

  );

  // return (
  //   <div className="flex flex-col w-full h-screen justify-start items-center pt-0">
  //     <div className="flex items-center gap-x-4 mb-4">
  //       <h1 className="font-semibold text-lg">Entry attempts on</h1>
  //       <ComboBox options={options} selected={selectedDoor}
  //         onChange={setSelectedDoor} text="Select Door"
  //       />
  //       <h1 className="font-semibold text-lg">door today</h1>
  //     </div>
  //     <div className="flex flex-row space-x-4">
  //       <LineGraph entryType="Successful Entries" data={sucData} />
  //       <LineGraph entryType="Failed Entries" data={failedData} />
  //     </div>
  //   </div>
  // );
}

export default Menu;