import { FailAccessTable } from "@/components/tables/FailAccessTable";
import { SuccessAccessTable } from "@/components/tables/SuccessAccessTable";
import { getFailedAccessBetween, getSuccessfulAccessBetween } from "@/services/AccessService";
import { useEffect } from "react";
import { useState } from "react";

function HistoricData() {
  const timezoneShift = 3600000*import.meta.env.VITE_TIMEZONE;
  const ONE_DAY_MILLIS = 86400000;
  const today = new Date(new Date() - timezoneShift).toISOString()
  const yesterday = new Date(new Date().getTime() - ONE_DAY_MILLIS - timezoneShift).toISOString();


  const [fromDate, setFromDate] = useState(yesterday.substring(0, 10));
  const [fromTime, setFromTime] = useState(yesterday.substring(11, 16));
  const [toDate, setToDate] = useState(today.substring(0, 10));
  const [toTime, setToTime] = useState(today.substring(11, 16));
  const [error, setError] = useState('');

  const [successfulList, setSucList] = useState(null);
  const [failedList, setFailedList] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(fromTime)

    if (!fromDate || !fromTime || !toDate || !toTime) {
      setError('Please fill out all fields.');
      return;
    }

    const from = new Date(`${fromDate}T${fromTime}`).getTime();
    const to = new Date(`${toDate}T${toTime}`).getTime();

    if (from >= to) {
      setError('"From" must be earlier than "To".');
    } else {
      setError('');
    }

    const sList = await getSuccessfulAccessBetween(from, to);
    const fList = await getFailedAccessBetween(from, to);
    setSucList(sList);
    setFailedList(fList);
  };

  return (
    <div className="flex-grow w-full">
      <div className="w-full max-w-4xl mx-auto space-y-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">History</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From:</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To:</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Submit
          </button>
        </form>

        {/* Tables */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white rounded-xl shadow-md p-4">
            <SuccessAccessTable entryType={"Successful Access"} data={successfulList} />
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-md p-4">
            <FailAccessTable entryType={"Failed Access"} data={failedList} />
          </div>
        </div>
      </div>
    </div>

  );
}

export default HistoricData;