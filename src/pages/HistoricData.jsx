import SideBar from "../components/SideBar";
import { useState } from "react";
import { DatePicker } from "../components/DatePicker";
import { TableDisp } from "../components/tableDisp";
import { HistoricComboBox } from "../components/HistoricComboBox";

function HistoricData() {
  const [selectedHour, setSelectedHour] = useState(""); // Set default value to empty
  const [amOrPm, setAmOrPm] = useState(""); // Set default value to empty

  function search() {}

  const values = [
    "Alice | Smith | Door 1 | 2025-05-01 | 08:15 AM | camera",
    "Bob | Johnson | Door 2 | 2025-05-02 | 09:20 AM | RFID",
    "Charlie | Brown | Door 3 | 2025-05-03 | 10:05 AM | camera",
    "Dana | White | Door 1 | 2025-05-04 | 11:45 AM | RFID",
    "Eli | Black | Door 2 | 2025-05-05 | 12:30 PM | camera",
    // Additional lines...
  ];

  const values2 = [
    "Door 1 | 2025-05-01 | 08:15 AM | camera",
    "Door 2 | 2025-05-02 | 09:20 AM | RFID",
    "Door 3 | 2025-05-03 | 10:05 AM | camera",
    "Door 1 | 2025-05-04 | 11:45 AM | RFID",
    "Door 2 | 2025-05-05 | 12:30 PM | camera",
    // Additional lines...
  ];

  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Access History</h1>

        {/* Date Range Picker & Time Selector */}
        <div className="flex flex-col items-start justify-between mb-6">
          {/* Date Range (From and To) */}
          <div className="flex items-center justify-between gap-8 mb-4">
            <div className="flex gap-8">
              <div className="flex flex-col items-start w-full">
                <label htmlFor="fromDate" className="font-semibold mb-2">
                  From:
                </label>
                <DatePicker id="fromDate" />
              </div>
              <div className="flex flex-col items-start w-full">
                <label htmlFor="toDate" className="font-semibold mb-2">
                  To:
                </label>
                <DatePicker id="toDate" />
              </div>
            </div>

            {/* Search Button */}
            <div>
            <button
            onClick={search}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-35" // Increase margin to mt-6 for more space
            >
              Search
          </button>

            </div>
          </div>

          {/* Hour & AM/PM Selection (Time Selector) */}
          <div className="flex justify-start gap-6 mb-4">
            <div className="py-2">
              <h2 className="text-gray-600 font-medium">(Optional)</h2>
            </div>
            <div className="flex flex-col items-center">
              <label className="mb-2 font-medium">Hour</label>
              <HistoricComboBox
                options={[
                  { value: "none", label: "" },
                  ...Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: (i + 1).toString() }))  // 12-hour options
                ]}
                selected={selectedHour}
                onChange={setSelectedHour}
            />


            </div>
            <div className="flex flex-col items-center">
              <label className="mb-2 font-medium">AM/PM</label>
              <HistoricComboBox
                options={[{ value: "none", label: " " }, { value: "AM", label: "AM" }, { value: "PM", label: "PM" }]}
                selected={amOrPm}
                onChange={setAmOrPm}
            />

            </div>
          </div>
        </div>

        {/* Table Display */}
        <div className="mt-6">
          <h1 className="text-lg">Successful</h1>
          <TableDisp
            columns={["Name", "Last Name", "Door", "Date", "Time", "Camera/RFID"]}
            data={values}
            title={"Successful"}
          />
          <h1 className="text-lg mt-8">Failed</h1>
          <TableDisp
            columns={["Door", "Date", "Time", "Camera/RFID"]}
            data={values2}
            title={"Failed"}
          />
        </div>
      </div>
    </div>
  );
}

export default HistoricData;
