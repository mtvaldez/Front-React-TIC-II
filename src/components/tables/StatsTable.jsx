import { getStats } from "@/utils/mathUtils";

export default function StatsTable({ successful = [], failed = [] }) {

    const successfulCounts = successful.map((e) => e.accessCount)
    const failedCounts = failed.map((e) => e.accessCount)

    const combinedCounts = [...successfulCounts, ...failedCounts];

    const stats = {
        Successful: getStats(successfulCounts),
        Failed: getStats(failedCounts),
        Total: getStats(combinedCounts),
    };

    const metricLabels = ['min', 'max', 'mean', 'median', 'stdv'];

    return (
        <div className="flex flex-col h-full">
            {/* Title */}
            <div className="text-center text-gray-800">
                <h3 className="text-lg font-medium mb-3">
                    Access Statistics by Day
                </h3>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto px-4">
                <div className="inline-block min-w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <table className="min-w-full text-sm text-center">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-gray-700">Metric</th>
                                <th className="px-4 py-3 text-green-600">Successful</th>
                                <th className="px-4 py-3 text-red-600">Failed</th>
                                <th className="px-4 py-3 text-gray-700">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {metricLabels.map((label, index) => (
                                <tr key={label} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="px-4 py-2 font-medium capitalize">{label}</td>
                                    <td className="px-4 py-2">{stats.Successful[label]}</td>
                                    <td className="px-4 py-2">{stats.Failed[label]}</td>
                                    <td className="px-4 py-2">{stats.Total[label]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );


    // return (
    //     <div className="overflow-x-auto mt-6">
    //         <table className="min-w-full border border-gray-300 text-sm text-center">
    //             <thead>
    //                 <tr className="bg-gray-100">
    //                     <th className="px-4 py-2">Metric</th>
    //                     <th className="px-4 py-2">Successful</th>
    //                     <th className="px-4 py-2">Failed</th>
    //                     <th className="px-4 py-2">Total</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {metricLabels.map((label) => (
    //                     <tr key={label} className="border-t">
    //                         <td className="px-4 py-2 font-medium capitalize">{label}</td>
    //                         <td className="px-4 py-2">{stats.Successful[label]}</td>
    //                         <td className="px-4 py-2">{stats.Failed[label]}</td>
    //                         <td className="px-4 py-2">{stats.Total[label]}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // );
}
