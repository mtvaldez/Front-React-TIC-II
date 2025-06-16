import { FailAccessTable } from "@/components/tables/FailAccessTable";
import { useState } from "react";
import { getStatsByDay } from "@/services/StatisticsService";
import BarGraph from "@/components/graphs/BarChart";
import StatsTable from "@/components/tables/StatsTable";

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

        const from = new Date(`${fromDate}`).getTime() + ONE_DAY_MILLIS;
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
        <div className="w-full h-full flex flex-col overflow-hidden px-8 pt-6">
            {/* Fixed Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Statistics</h1>
                <hr className="border-gray-300 mt-2 mb-4 w-full" />
            </div>

            <div className="flex-1 overflow-auto pb-6 space-y-6">
                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6 w-full ">
                    <h2 className="text-2xl font-bold text-gray-800">Filter by Date</h2>

                    <div className="flex gap-6">
                        {["From", "To"].map((label) => {
                            const lower = label.toLowerCase();
                            return (
                                <div key={label} className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}:</label>
                                    <input type="date" value={range[`${lower}Date`]} onChange={handleChange(`${lower}Date`)}
                                        className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                            );
                        })}
                    </div>

                    {stats.error && <div className="text-red-600 text-sm">{stats.error}</div>}

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition" >
                        Submit
                    </button>
                </form>

                {/* Graph */}
                <div className="bg-white rounded-xl shadow-md p-4 w-full">
                    {stats.loading ? (
                        <div className="flex items-center justify-center h-40">
                            <div className="flex items-center space-x-4">
                                <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-12 w-12" />
                                <span className="text-gray-700 font-semibold">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <BarGraph successful={stats.statsGraphData?.successful} failed={stats.statsGraphData?.failed} />
                    )}
                </div>

                {/* Table Placeholder */}
                <div className="bg-white rounded-xl shadow-md p-6 w-full">
                    <StatsTable successful={stats.statsGraphData?.successful} failed={stats.statsGraphData?.failed}/>
                    {/* <h2 className="text-xl font-semibold text-gray-800 mb-2">Detailed Statistics Table</h2>
                    <p className="text-gray-500">Table coming soon...</p> */}
                </div>
            </div>
        </div>
    );
}

export default Stats;
