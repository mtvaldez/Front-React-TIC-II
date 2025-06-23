import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BarGraph = ({ successful = [], failed = [] }) => {
    const allDates = Array.from(
        new Set([
            ...successful.map((e) => e.timestamp),
            ...failed.map((e) => e.timestamp),
        ])
    ).sort();

    const data = allDates.map((dateMillis) => {
        const sucEntry = successful.find((e) => e.timestamp === dateMillis);
        const failEntry = failed.find((e) => e.timestamp === dateMillis);

        return {
            date: new Date(dateMillis).toLocaleDateString(),
            Success: sucEntry ? sucEntry.accessCount : 0,
            Fail: failEntry ? failEntry.accessCount : 0,
        };
    });

    if (data.length === 0) {
        return (
            <div className="text-center mt-10 text-gray-600">
                <h2 className="text-lg font-semibold mb-2">Accesses By Day</h2>
                <p>Select a timeframe to begin.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full min-h-0">
            {/* Header */}
            <div className="text-center text-gray-800 shrink-0">
                <h3 className="text-lg font-medium mb-3">
                    Access Summary by Day
                </h3>
            </div>

            {/* Chart Container */}
            <div className="flex-1 px-4">
                <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Success" fill="#64B93C" />
                            <Bar dataKey="Fail" fill="#EC3F75" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default BarGraph;
