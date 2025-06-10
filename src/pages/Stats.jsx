import { FailAccessTable } from "@/components/tables/FailAccessTable";
import { useState } from "react";
import { getStatsByDay } from "@/services/StatisticsService";
import BarGraph from "@/components/graphs/BarChart";

const ONE_DAY_MILLIS = 86400000;

function Stats() {

    const now = new Date(new Date()).toISOString();
    const yesterday = new Date(new Date().getTime() - ONE_DAY_MILLIS).toISOString();

    const [range, setRange] = useState({
        fromDate: yesterday.substring(0, 10),
        toDate: now.substring(0, 10),
    });

    const [stats, setStats] = useState({
        statsGraphData: null,
        loading: false,
        error: "",
    });

    const handleChange = (field) => (e) => {
        setRange((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fromDate, toDate } = range;

        if (!fromDate || !toDate) {
            setStats((prev) => ({ ...prev, error: "Please fill out all fields." }));
            return;
        }

        const from = new Date(`${fromDate}`).getTime();
        const to = new Date(`${toDate}`).getTime() + ONE_DAY_MILLIS;

        if (from >= to) {
            setStats((prev) => ({ ...prev, error: '"From" must be earlier than "To".' }));
            return;
        }

        setStats({ statsGraphData: null, loading: true, error: "" });

        try {
            const res = await getStatsByDay(from, to)
            setStats({ statsGraphData: res, loading: false, error: "" });
        } catch (err) {
            setStats({ statsGraphData: null, loading: false, error: "Failed to fetch data." });
        }
    };
    
    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col space-y-6 flex-grow overflow-hidden">
            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Statistics</h2>

                <div className="flex gap-6">
                    {["From", "To"].map((label) => {
                        const lower = label.toLowerCase();
                        return (
                            <div key={label} className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">{label}:</label>
                                <input
                                    type="date"
                                    value={range[`${lower}Date`]}
                                    onChange={handleChange(`${lower}Date`)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        );
                    })}
                </div>

                {stats.error && <div className="text-red-600 text-sm">{stats.error}</div>}

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
                        {stats.loading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="flex items-center space-x-4">
                                    <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-12 w-12" />
                                    <span className="text-gray-700 font-semibold">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <BarGraph successful={stats.statsGraphData?.successful} failed={stats.statsGraphData?.failed}/>
                        )}
                    </div>
                </div>

                <div className="flex-1 bg-white rounded-xl shadow-md p-4 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-auto min-h-0">
                        {stats.loading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="flex items-center space-x-4">
                                    <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-12 w-12" />
                                    <span className="text-gray-700 font-semibold">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            
                            <FailAccessTable entryType="Failed Access List" data={null} emptyMsg={"Select a timeframe with data to view"} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;
