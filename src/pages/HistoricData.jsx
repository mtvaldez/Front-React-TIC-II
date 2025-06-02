import { FailAccessTable } from "@/components/tables/FailAccessTable";
import { SuccessAccessTable } from "@/components/tables/SuccessAccessTable";
import { getFailedAccessBetween, getSuccessfulAccessBetween } from "@/services/AccessService";
import { useEffect } from "react";
import { useState } from "react";

function HistoricData() {
  const [fromDate, setFromDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toDate, setToDate] = useState('');
  const [toTime, setToTime] = useState('');
  const [error, setError] = useState('');

  const [successfulList, setSucList] = useState(null);
  const [failedList, setFailedList] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fromDate || !fromTime || !toDate || !toTime) {
      setError('Please fill out all fields.');
      return;
    }

    const from = new Date(`${fromDate}T${fromTime}`);
    const to = new Date(`${toDate}T${toTime}`);

    if (from >= to) {
      setError('"From" must be earlier than "To".');
    } else {
      setError('');
      // console.log('Fetching history from', from, 'to', to);
    }

    const sList = await getSuccessfulAccessBetween();
    const fList = await getFailedAccessBetween();
    setSucList(sList);
    setFailedList(fList);

  };

  return (
    <div className="flex-grow w-full">
      <div className="w-full max-w-4xl mx-auto space-y-10">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-10 space-y-6"
        >
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
            <SuccessAccessTable entryType={"Successful Access"} data={successfulList}/>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-md p-4">
            <FailAccessTable entryType={"Failed Access"} data={failedList}/>
          </div>
        </div>
      </div>
    </div>

  );
}

// function HistoricData() {
//   const [selectedHour, setSelectedHour] = useState("");
//   const [amOrPm, setAmOrPm] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");
//   const [values, setValues] = useState([]);
//   const [values2, setValues2] = useState([]);
//   const [error, setError] = useState('');


//   function getData() {
//     setError("");
//     if (dateFrom == "" || dateTo == "") {
//       setError('Both dates are required');
//       return;
//     }

//     if (new Date(dateFrom) > new Date(dateTo)) {
//       setError('The start date cannot be after the end date');
//       return;
//     }


//     function parseTime(timeToParse, half) {
//       if (half == "PM") {
//         return (parseInt(timeToParse) + 12).toString();
//       } else {
//         return (timeToParse).toString();
//       }
//     }
//     const time = (selectedHour && amOrPm) ? parseTime(selectedHour, amOrPm) : "n";

//     fetch(`${localStorage.getItem("url")}/history`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         date_from: dateFrom,
//         date_to: dateTo,
//         time: time
//       })
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.result === 1) {
//           alert(data.error);
//         } else {
//           const successfulRows = data.successful.map(item =>
//             `${item.name} | ${item.l_name} | ${item.door} | ${item.date} | ${item.time} | ${item.type}`
//           );
//           const failedRows = data.failed.map(item =>
//             `${item.door} | ${item.date} | ${item.time} | ${item.type}`
//           );
//           setValues(successfulRows);
//           setValues2(failedRows);
//         }
//       })
//       .catch(error => {
//         console.error("getting history failed:", error);
//       });
//   }


//   return (
//     <div className="flex min-h-screen">
//       <SideBar />

//       {/* <div className="flex-1 p-8">
//         <h1 className="text-2xl font-bold mb-6 text-center">Access History</h1>

//         <div className="flex flex-col items-center gap-4 mb-6">

//           <div className="flex gap-6">
//             <div className="flex flex-col">
//               <label htmlFor="fromDate" className="font-semibold mb-1">From:</label>
//               <DatePicker id="fromDate" onChange={setDateFrom} value={dateFrom} />
//             </div>

//             <div className="flex flex-col">
//               <label htmlFor="toDate" className="font-semibold mb-1">To:</label>
//               <DatePicker id="toDate" onChange={setDateTo} value={dateTo} />

//             </div>
//           </div>

//           <button
//             onClick={getData}
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//           >
//             Search
//           </button>

//           {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
//         </div>
//       </div> */}

//     </div>
//   );
// }

export default HistoricData;