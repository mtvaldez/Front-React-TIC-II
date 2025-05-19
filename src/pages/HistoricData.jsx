import SideBar from "../components/SideBar";
import { useState } from "react";
import { DatePicker } from "../components/DatePicker";
import { TableDisp } from "../components/tableDisp";
import { HistoricComboBox } from "../components/HistoricComboBox";

function HistoricData() {
  const [selectedHour, setSelectedHour] = useState("");
  const [amOrPm, setAmOrPm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [values, setValues] = useState([]);
  const [values2, setValues2] = useState([]);
  const [error, setError] = useState('');


  function getData() {
    setError("");
    if (dateFrom == "" || dateTo == "") {
      setError('Both dates are required');
      return;
    }
      
    if (new Date(dateFrom) > new Date(dateTo)) {
        setError('The start date cannot be after the end date');
        return;
    }
    

    function parseTime(timeToParse, half){
      if (half == "PM"){
        return (parseInt(timeToParse)+12).toString();
      }else{
        return (timeToParse).toString();
      }
    }
    const time = (selectedHour && amOrPm) ? parseTime(selectedHour, amOrPm) : "n";

    fetch(`${localStorage.getItem("url")}/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        date_from: dateFrom, 
        date_to: dateTo, 
        time: time
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 1) {
        alert(data.error);
      } else {
      const successfulRows = data.successful.map(item => 
        `${item.name} | ${item.l_name} | ${item.door} | ${item.date} | ${item.time} | ${item.type}`
      );
      const failedRows = data.failed.map(item => 
        `${item.door} | ${item.date} | ${item.time} | ${item.type}`
      );
      setValues(successfulRows);
      setValues2(failedRows);
      }
    })
    .catch(error => {
      console.error("getting history failed:", error);
    });
  }
  

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
                <DatePicker id="fromDate" onChange={setDateFrom} value={dateFrom} />
              </div>
              <div className="flex flex-col items-start w-full">
                <label htmlFor="toDate" className="font-semibold mb-2">
                  To:
                </label>
                <DatePicker id="toDate" onChange={setDateTo} value={dateTo}/>
              </div>
            </div>

            {/* Search Button */}
            <div>
            <button
            onClick={getData}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-35"
            >
              Search
            </button>
            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
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
                  { value: "", label: "None" },
                  ...Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: (i + 1).toString() }))  // 12-hour options
                ]}
                selected={selectedHour}
                onChange={setSelectedHour}
            />
            </div>
            <div className="flex flex-col items-center">
              <label className="mb-2 font-medium">AM/PM</label>
              <HistoricComboBox
                options={[{ value: "", label: "None" }, { value: "AM", label: "AM" }, { value: "PM", label: "PM" }]}
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