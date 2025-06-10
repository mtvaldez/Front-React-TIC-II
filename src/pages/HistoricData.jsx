import { FailAccessTable } from "@/components/tables/FailAccessTable";
import { SuccessAccessTable } from "@/components/tables/SuccessAccessTable";
import { getFailedAccessBetween, getSuccessfulAccessBetween } from "@/services/AccessService";
import { useState } from "react";

function HistoricData() {
  const timezoneShift = 3600000 * import.meta.env.VITE_TIMEZONE;
  const ONE_DAY_MILLIS = 86400000;

  const now = new Date(new Date() - timezoneShift).toISOString();
  const yesterday = new Date(new Date().getTime() - ONE_DAY_MILLIS - timezoneShift).toISOString();

  const [range, setRange] = useState({
    fromDate: yesterday.substring(0, 10),
    fromTime: yesterday.substring(11, 16),
    toDate: now.substring(0, 10),
    toTime: now.substring(11, 16),
  });

  const [state, setState] = useState({
    success: null,
    failed: null,
    loading: false,
    error: "",
  });

  const handleChange = (field) => (e) => {
    setRange((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fromDate, fromTime, toDate, toTime } = range;

    if (!fromDate || !fromTime || !toDate || !toTime) {
      setState((prev) => ({ ...prev, error: "Please fill out all fields." }));
      return;
    }

    const from = new Date(`${fromDate}T${fromTime}`).getTime();
    const to = new Date(`${toDate}T${toTime}`).getTime();

    if (from >= to) {
      setState((prev) => ({ ...prev, error: '"From" must be earlier than "To".' }));
      return;
    }

    setState({ success: null, failed: null, loading: true, error: "" });

    try {
      const [success, failed] = await Promise.all([
        getSuccessfulAccessBetween(from, to),
        getFailedAccessBetween(from, to),
      ]);

      setState({ success, failed, loading: false, error: "" });
    } catch (err) {
      setState({ success: null, failed: null, loading: false, error: "Failed to fetch data." });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col space-y-6 flex-grow overflow-hidden">
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">History</h2>

        {["From", "To"].map((label) => {
          const lower = label.toLowerCase();
          return (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}:</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={range[`${lower}Date`]}
                  onChange={handleChange(`${lower}Date`)}
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="time"
                  value={range[`${lower}Time`]}
                  onChange={handleChange(`${lower}Time`)}
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          );
        })}

        {state.error && <div className="text-red-600 text-sm">{state.error}</div>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {/* Scrollable Tables */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        <div className="flex-1 bg-white rounded-xl shadow-md p-4 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto min-h-0">
            {state.loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center space-x-4">
                  <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-12 w-12" />
                  <span className="text-gray-700 font-semibold">Loading...</span>
                </div>
              </div>
            ) : (
              <SuccessAccessTable entryType="Successful Access List" data={state.success} emptyMsg={"Select a timeframe with data to view"} />
            )}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-md p-4 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto min-h-0">
            {state.loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center space-x-4">
                  <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-12 w-12" />
                  <span className="text-gray-700 font-semibold">Loading...</span>
                </div>
              </div>
            ) : (
              <FailAccessTable entryType="Failed Access List" data={state.failed} emptyMsg={"Select a timeframe with data to view"}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoricData;
