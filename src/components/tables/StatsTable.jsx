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
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full border border-gray-300 text-sm text-center">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2">Metric</th>
                        <th className="px-4 py-2">Successful</th>
                        <th className="px-4 py-2">Failed</th>
                        <th className="px-4 py-2">Combined</th>
                    </tr>
                </thead>
                <tbody>
                    {metricLabels.map((label) => (
                        <tr key={label} className="border-t">
                            <td className="px-4 py-2 font-medium capitalize">{label}</td>
                            <td className="px-4 py-2">{stats.Successful[label]}</td>
                            <td className="px-4 py-2">{stats.Failed[label]}</td>
                            <td className="px-4 py-2">{stats.Total[label]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
