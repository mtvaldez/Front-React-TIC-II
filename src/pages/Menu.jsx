import LineGraph from "../components/graphs/LineGraph";
import { ComboBox } from "../components/ui/ComboBox";
import { useEffect, useState } from "react";
import { getDoors } from "@/services/DoorService";
import { getFailedAccessData, getSuccessfulAccessData } from "@/services/StatisticsService";
import { getFailedAccessBetween, getSuccessfulAccessBetween } from "@/services/AccessService";
import { SuccessAccessTable } from "@/components/tables/SuccessAccessTable";
import { FailAccessTable } from "@/components/tables/FailAccessTable";
import { groupAccessDataMap, groupAccessListMap } from "@/utils/groupMapUtils";
import { errorToast } from "@/components/ui/customToasts";

const ONE_DAY_MILLIS = 86400000;
const successTitle = "Successful Entries";
const failTitle = "Failed Entries";

export default function Menu() {
  const today = Date.now();
  const yesterday = today - ONE_DAY_MILLIS;

  const [options, setOptions] = useState([]);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    failedDataMap: new Map(),
    successfulDataMap: new Map(),
    failedListMap: new Map(),
    sucListMap: new Map(),
  });

  const [display, setDisplay] = useState({
    failedData: null,
    sucData: null,
    failedList: null,
    sucList: null,
  });

  const loadData = async () => {
    try {
      const [allDoors, successfulGraph, failedGraph, successfulList, failedList] = await Promise.all([
        getDoors(),
        getSuccessfulAccessData(yesterday, today),
        getFailedAccessData(yesterday, today),
        getSuccessfulAccessBetween(yesterday, today),
        getFailedAccessBetween(yesterday, today),
      ]);

      setOptions([{ value: "All", label: "All" }, ...allDoors.map(d => ({ value: d.name, label: d.name }))]);

      setData({
        failedDataMap: groupAccessDataMap(failedGraph),
        successfulDataMap: groupAccessDataMap(successfulGraph),
        failedListMap: groupAccessListMap(failedList),
        sucListMap: groupAccessListMap(successfulList),
      });

    } catch (error) {
      errorToast('Error fetching some data')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!selectedDoor) return;

    setDisplay({
      failedData: data.failedDataMap.get(selectedDoor),
      sucData: data.successfulDataMap.get(selectedDoor),
      failedList: data.failedListMap.get(selectedDoor),
      sucList: data.sucListMap.get(selectedDoor),
    });
  }, [selectedDoor, data]);

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
    <div className="flex flex-col h-screen">
      {/* Header + Selector */}
      <div className="shrink-0 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Last 24 hours' Accesses</h1>
        <hr className="my-4 border-gray-300" />
        <div className="flex items-center gap-x-4 mb-4 justify-center flex-wrap text-center">
          <h1 className="font-semibold text-lg">Entry attempts on</h1>
          <ComboBox
            options={options}
            selected={selectedDoor}
            onChange={setSelectedDoor}
            text="Select Door"
          />
          <h1 className="font-semibold text-lg">door today</h1>
        </div>
      </div>

      {/* Graphs */}
      

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
  <div className="flex-1 min-w-0 h-full min-h-0">
    <LineGraph entryType={successTitle} data={display.sucData} green />
  </div>
  <div className="flex-1 min-w-0 h-full min-h-0">
    <LineGraph entryType={failTitle} data={display.failedData} green={false} />
  </div>
</div>

{/* Tables */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0 overflow-hidden">
  <div className="flex-1 min-w-0 bg-white p-4 shadow rounded-md overflow-auto">
    <SuccessAccessTable
      entryType={successTitle + " List"}
      data={display.sucList}
      emptyMsg={"No data available for the selected door"}
    />
  </div>
  <div className="flex-1 min-w-0 bg-white p-4 shadow rounded-md overflow-auto">
    <FailAccessTable
      entryType={failTitle + " List"}
      data={display.failedList}
      emptyMsg={"No data available for the selected door"}
    />
  </div>
</div>


    </div>

  );
}