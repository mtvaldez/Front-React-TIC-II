import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BarGraph = ({ successful = [], failed = [] }) => {
    const allDates = Array.from(
        new Set([
            ...successful.map((e) => e.accessDayMillis),
            ...failed.map((e) => e.accessDayMillis),
        ])
    ).sort();

    const data = allDates.map((dateMillis) => {
        const sucEntry = successful.find((e) => e.accessDayMillis === dateMillis);
        const failEntry = failed.find((e) => e.accessDayMillis === dateMillis);

        return {
            date: new Date(dateMillis).toLocaleDateString(),
            Success: sucEntry ? sucEntry.accessCount : 0,
            Fail: failEntry ? failEntry.accessCount : 0,
        };
    });

    if (data.length === 0) {
        return <div className="text-center text-gray-500 mt-4">No data available</div>;
    }

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Success" fill="#4ade80" /> {/* green */}
                    <Bar dataKey="Fail" fill="#f87171" /> {/* red */}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarGraph;
