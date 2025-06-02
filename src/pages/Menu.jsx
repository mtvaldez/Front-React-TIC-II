import SideBar from "../components/SideBar";
import LineGraph from "../components/LineGraph";
import { ComboBox } from "../components/ui/ComboBox";
import { useEffect, useState } from "react";
import { getDoors } from "@/services/DoorService";
import { getFailedAccessData, getSuccessfulAccessData } from "@/services/StatisticsService";
import { SuccessAccessTable } from "@/components/tables/SuccessAccessTable";
import { FailAccessTable } from "@/components/tables/FailAccessTable";
import { getFailedAccessBetween, getSuccessfulAccessBetween } from "@/services/AccessService";
import { groupAccessDataMap, groupAccessListMap } from "@/utils/groupMapUtils";


function Menu() {
  const ONE_DAY_MILLIS = 86400000;
  const successTitle = "Successful Entries";
  const failTitle = "Failed Entries";
  const today = Date.now(); 
  const yesterday = today - ONE_DAY_MILLIS;

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
      const doors = [ {value:"All" , label:"All"}, ...allDoors.map(door => ({ value: door.name, label: door.name })) ];
      setOptions(doors);
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchSuccessfulAccessData() {
    try {
      const successful = await getSuccessfulAccessData(yesterday, today);
      const successfulMap = groupAccessDataMap(successful);

      setSuccessfulDataMap(successfulMap);
    } catch (error) {
      console.error("Error fetching door data:", error);
    }
  }

  async function fetchFailedAccessData() {
    try {
      const failed = await getFailedAccessData(yesterday, today)
      const failedMap = groupAccessDataMap(failed);

      setFailedDataMap(failedMap);
    } catch (error) {
      console.error("Error fetching door data:", error);
    }
  }

  async function fetchSuccessfulList() {
    try {
      const successful = await getSuccessfulAccessBetween(yesterday, today);
      const successfulMap = groupAccessListMap(successful);

      setSucListMap(successfulMap);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchFailedList() {
    try {
      const failed = await getFailedAccessBetween(yesterday, today);
      const failedMap = groupAccessListMap(failed);

      setFailedListMap(failedMap);
    } catch (error) {
      console.error(error);
    }
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
    setLoading(true);
    fetchDoors();
    fetchSuccessfulAccessData();
    fetchFailedAccessData();
    fetchSuccessfulList();
    fetchFailedList();
    setLoading(false);
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

      {/* Graphs */}
      <div className="flex flex-wrap md:flex-nowrap w-full gap-4">
        <div className="flex-1 min-w-0">
          <LineGraph entryType={successTitle} data={sucData} green={true} />
        </div>
        <div className="hidden md:block w-px bg-gray-300" />
        <div className="flex-1 min-w-0">
          <LineGraph entryType={failTitle} data={failedData} green={false} />
        </div>
      </div>

      {/* Tables */}
      <div className="flex flex-wrap md:flex-nowrap gap-4 mt-6 w-full">
        <div className="flex-1 min-w-0 bg-white p-4 shadow rounded-md">
          <SuccessAccessTable entryType={successTitle} data={sucList} />
        </div>
        <div className="flex-1 min-w-0 bg-white p-4 shadow rounded-md">
          <FailAccessTable entryType={failTitle} data={failedList} />
        </div>
      </div>
    </div>

  );
}

export default Menu;